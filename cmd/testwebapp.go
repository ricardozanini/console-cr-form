package main

import (
	"github.com/RHsyseng/console-cr-form/pkg/web"
	"github.com/ghodss/yaml"
	"github.com/go-openapi/spec"
	"github.com/sirupsen/logrus"
)

func main() {
	config, err := web.NewConfiguration("", 8080, getSchema(), "app.kiegroup.org/v1", "KieApp", getForm(), callback)
	if err != nil {
		logrus.Errorf("Failed to configure web server: %v", err)
	}
	if err := web.RunWebServer(config); err != nil {
		logrus.Errorf("Failed to run web server: %v", err)
	}
}

func callback(yamlString string) {
	logrus.Infof("Mock deploy yaml:\n%s", yamlString)
}

func getForm() web.Form {
	return web.Form{
		Pages: []web.Page{
			{
				Fields: []web.Field{
					{
						Label:    "Name",
						Default:  "rhpam-trial",
						Required: true,
						JSONPath: "$.metadata.name",
					},
					{
						Label:    "Environment",
						Default:  "rhpam-trial",
						Required: true,
						JSONPath: "$.spec.environment",
					},
				},
				Buttons: []web.Button{
					{
						Label:  "Cancel",
						Action: web.Cancel,
					},
					{
						Label:  "Deploy",
						Action: web.Submit,
					},
					{
						Label:  "Customize",
						Action: web.Next,
					},
				},
			},
		},
	}
}

type CustomResourceDefinition struct {
	Spec CustomResourceDefinitionSpec `json:"spec,omitempty"`
}

type CustomResourceDefinitionSpec struct {
	Validation CustomResourceDefinitionValidation `json:"validation,omitempty"`
}

type CustomResourceDefinitionValidation struct {
	OpenAPIV3Schema spec.Schema `json:"openAPIV3Schema,omitempty"`
}

func getSchema() spec.Schema {
	rhpamSchema := `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: kieapps.app.kiegroup.org
spec:
  group: app.kiegroup.org
  names:
    kind: KieApp
    listKind: KieAppList
    plural: kieapps
    singular: kieapp
  scope: Namespaced
  version: v1
  validation:
    openAPIV3Schema:
      required:
        - spec
      properties:
        spec:
          type: object
          required:
            - environment
          properties:
            environment:
              type: string
              description: The name of the environment used as a baseline
              enum:
                - rhdm-authoring-ha
                - rhdm-authoring
                - rhdm-optaweb-trial
                - rhdm-production-immutable
                - rhdm-trial
                - rhpam-authoring-ha
                - rhpam-authoring
                - rhpam-production-immutable
                - rhpam-production
                - rhpam-trial
            objects:
              type: object
              description: Configuration of the RHPAM components
              properties:
                console:
                  type: object
                  description: Configuration of the RHPAM workbench
                  properties:
                    keystoreSecret:
                      type: string
                      description: Keystore secret name
                    env:
                      type: array
                      items:
                        type: object
                        required:
                          - name
                        oneOf:
                          - required:
                              - value
                          - required:
                              - valueFrom
                        properties:
                          name:
                            type: string
                            description: Name of an environment variable
                          value:
                            type: string
                            description: Value for that environment variable
                          valueFrom:
                            type: object
                            description: Source for the environment variable's value
                    resources:
                      type: object
                      properties:
                        limits:
                          type: object
                        requests:
                          type: object
                    ssoClient:
                      type: object
                      description: Client definitions used for creating the RH-SSO clients in the specified Realm
                      properties:
                        name:
                          type: string
                          description: Client name
                        secret:
                          type: string
                          format: password
                          description: Client secret
                        hostnameHTTP:
                          type: string
                          description: Hostname to set as redirect URL
                        hostnameHTTPS:
                          type: string
                          description: Secure hostname to set as redirect URL
                servers:
                  type: array
                  description: Configuration of the each individual KIE server
                  minItems: 1
                  items:
                    type: object
                    description: KIE Server configuration
                    properties:
                      name:
                        type: string
                        description: Server name
                      deployments:
                        type: integer
                        format: int
                        description: Number of Server sets that will be deployed
                      keystoreSecret:
                        type: string
                        description: Keystore secret name
                      from:
                        type: object
                        description: Image definition to use for all the servers
                        required:
                          - kind
                          - name
                        properties:
                          kind:
                            type: string
                            description: Object kind
                            enum:
                              - ImageStreamTag
                              - DockerImage
                          name:
                            type: string
                            description: Object name
                          namespace:
                            type: string
                            description: Namespace where the object is located
                      build:
                        type: object
                        description: Configuration of build configs for immutable KIE servers
                        required:
                          - kieServerContainerDeployment
                          - gitSource
                        properties:
                          kieServerContainerDeployment:
                            type: string
                            description: The Maven GAV to deploy, e.g., rhpam-kieserver-library=org.openshift.quickstarts:rhpam-kieserver-library:1.4.0-SNAPSHOT
                          mavenMirrorURL:
                            type: string
                            description: Maven mirror to use for S2I builds
                          artifactDir:
                            type: string
                            description: List of directories from which archives will be copied into the deployment folder. If unspecified, all archives in /target will be copied.
                          gitSource:
                            type: object
                            required:
                              - uri
                              - reference
                            properties:
                              uri:
                                type: string
                                description: Git URI for the s2i source
                              reference:
                                type: string
                                description: Branch to use in the git repository
                              contextDir:
                                type: string
                                description: Context/subdirectory where the code is located, relatively to repo root
                          webhooks:
                            type: array
                            minItems: 1
                            items:
                              type: object
                              description: WebHook secretes for build configs
                              required:
                                - type
                                - secret
                              properties:
                                type:
                                  type: string
                                  description: WebHook type, either GitHub or Generic
                                  enum:
                                    - GitHub
                                    - Generic
                                secret:
                                  type: string
                                  description: Secret value for webhook
                          from:
                            type: object
                            description: Image definition to use for all the servers
                            required:
                              - kind
                              - name
                            properties:
                              kind:
                                type: string
                                description: Object kind. e.g. ImageStreamTag
                              name:
                                type: string
                                description: Object name
                              namespace:
                                type: string
                                description: Namespace where the object is located
                      env:
                        type: array
                        items:
                          type: object
                          required:
                            - name
                          oneOf:
                            - required:
                                - value
                            - required:
                                - valueFrom
                          properties:
                            name:
                              type: string
                              description: Name of an environment variable
                            value:
                              type: string
                              description: Value for that environment variable
                            valueFrom:
                              type: object
                              description: Source for the environment variable's value
                      resources:
                        type: object
                        properties:
                          limits:
                            type: object
                          requests:
                            type: object
                      ssoClient:
                        type: object
                        description: Client definitions used for creating the RH-SSO clients in the specified Realm
                        properties:
                          name:
                            type: string
                            description: Client name
                          secret:
                            type: string
                            format: password
                            description: Client secret
                          hostnameHTTP:
                            type: string
                            description: Hostname to set as redirect URL
                          hostnameHTTPS:
                            type: string
                            description: Secure hostname to set as redirect URL
                smartRouter:
                  type: object
                  description: Configuration of the RHPAM smart router
                  properties:
                    keystoreSecret:
                      type: string
                      description: Keystore secret name
                    env:
                      type: array
                      items:
                        type: object
                        required:
                          - name
                        oneOf:
                          - required:
                              - value
                          - required:
                              - valueFrom
                        properties:
                          name:
                            type: string
                            description: Name of an environment variable
                          value:
                            type: string
                            description: Value for that environment variable
                          valueFrom:
                            type: object
                            description: Source for the environment variable's value
                    resources:
                      type: object
                      properties:
                        limits:
                          type: object
                        requests:
                          type: object
            imageRegistry:
              type: object
              description: If required imagestreams are missing in both the 'openshift' and local namespaces, the operator will create said imagestreams locally using the registry specified here.
              properties:
                registry:
                  type: string
                  description: Image registry's base 'url:port'. e.g. registry.example.com:5000. Defaults to 'registry.redhat.io'.
                insecure:
                  type: boolean
                  description: A flag used to indicate the specified registry is insecure. Defaults to 'false'.
            auth:
              type: object
              description: Authentication integration configuration
              properties:
                sso:
                  type: object
                  description: RH-SSO integration configuration
                  required:
                    - url
                    - realm
                  properties:
                    url:
                      type: string
                      description: RH-SSO URL
                    realm:
                      type: string
                      description: RH-SSO Realm name
                    adminUser:
                      type: string
                      description: RH-SSO Realm Admin Username used to create the Client if it doesn't exist
                    adminPassword:
                      type: string
                      format: password
                      description: RH-SSO Realm Admin Password used to create the Client
                    disableSSLCertValidation:
                      type: boolean
                      description: RH-SSO Disable SSL Certificate Validation
                    principalAttribute:
                      type: string
                      description: RH-SSO Principal Attribute to use as username
                ldap:
                  type: object
                  description: LDAP integration configuration
                  required:
                    - url
                  properties:
                    url:
                      type: string
                      description: LDAP Endpoint to connect for authentication
                    bindDN:
                      type: string
                      description: Bind DN used for authentication
                    bindCredential:
                      type: string
                      format: password
                      description: LDAP Credentials used for authentication
                    jaasSecurityDomain:
                      type: string
                      description: The JMX ObjectName of the JaasSecurityDomain used to decrypt the password.
                    baseCtxDN:
                      type: string
                      description: LDAP Base DN of the top-level context to begin the user search.
                    baseFilter:
                      type: string
                      description: DAP search filter used to locate the context of the user to authenticate. The input username or userDN obtained from the login module callback is substituted into the filter anywhere a {0} expression is used. A common example for the search filter is (uid={0}).
                    searchScope:
                      type: string
                      enum:
                        - SUBTREE_SCOPE
                        - OBJECT_SCOPE
                        - ONELEVEL_SCOPE
                      description: The search scope to use.
                    searchTimeLimit:
                      type: integer
                      format: int32
                      description: The timeout in milliseconds for user or role searches.
                    distinguishedNameAttribute:
                      type: string
                      description: The name of the attribute in the user entry that contains the DN of the user. This may be necessary if the DN of the user itself contains special characters, backslash for example, that prevent correct user mapping. If the attribute does not exist, the entry’s DN is used.
                    parseUsername:
                      type: boolean
                      description: A flag indicating if the DN is to be parsed for the username. If set to true, the DN is parsed for the username. If set to false the DN is not parsed for the username. This option is used together with usernameBeginString and usernameEndString.
                    usernameBeginString:
                      type: string
                      description: Defines the String which is to be removed from the start of the DN to reveal the username. This option is used together with usernameEndString and only taken into account if parseUsername is set to true.
                    usernameEndString:
                      type: string
                      description: Defines the String which is to be removed from the end of the DN to reveal the username. This option is used together with usernameBeginString and only taken into account if parseUsername is set to true.
                    roleAttributeID:
                      type: string
                      description: Name of the attribute containing the user roles.
                    rolesCtxDN:
                      type: string
                      description: The fixed DN of the context to search for user roles. This is not the DN where the actual roles are, but the DN where the objects containing the user roles are. For example, in a Microsoft Active Directory server, this is the DN where the user account is.
                    roleFilter:
                      type: string
                      description: A search filter used to locate the roles associated with the authenticated user. The input username or userDN obtained from the login module callback is substituted into the filter anywhere a {0} expression is used. The authenticated userDN is substituted into the filter anywhere a {1} is used. An example search filter that matches on the input username is (member={0}). An alternative that matches on the authenticated userDN is (member={1}).
                    roleRecursion:
                      type: integer
                      format: int16
                      description: The number of levels of recursion the role search will go below a matching context. Disable recursion by setting this to 0.
                    defaultRole:
                      type: string
                      description: A role included for all authenticated users
                    roleNameAttributeID:
                      type: string
                      description: Name of the attribute within the roleCtxDN context which contains the role name. If the roleAttributeIsDN property is set to true, this property is used to find the role object’s name attribute.
                    parseRoleNameFromDN:
                      type: boolean
                      description: A flag indicating if the DN returned by a query contains the roleNameAttributeID. If set to true, the DN is checked for the roleNameAttributeID. If set to false, the DN is not checked for the roleNameAttributeID. This flag can improve the performance of LDAP queries.
                    roleAttributeIsDN:
                      type: boolean
                      description: Whether or not the roleAttributeID contains the fully-qualified DN of a role object. If false, the role name is taken from the value of the roleNameAttributeId attribute of the context name. Certain directory schemas, such as Microsoft Active Directory, require this attribute to be set to true.
                    referralUserAttributeIDToCheck:
                      type: string
                      description: If you are not using referrals, you can ignore this option. When using referrals, this option denotes the attribute name which contains users defined for a certain role, for example member, if the role object is inside the referral. Users are checked against the content of this attribute name. If this option is not set, the check will always fail, so role objects cannot be stored in a referral tree.
                roleMapper:
                  type: object
                  description: RoleMapper configuration
                  required:
                    - rolesProperties
                  properties:
                    rolesProperties:
                      type: string
                      description: When present, the RoleMapping Login Module will be configured to use the provided file. This property defines the fully-qualified file path and name of a properties file or resource which maps roles to replacement roles. The format is original_role=role1,role2,role3
                    replaceRole:
                      type: boolean
                      description: Whether to add to the current roles, or replace the current roles with the mapped ones. Replaces if set to true.
`
	crd := &CustomResourceDefinition{}
	err := yaml.Unmarshal([]byte(rhpamSchema), crd)
	if err != nil {
		panic("Failed to unmarshal static schema, there must be an environment problem!")
	}
	return crd.Spec.Validation.OpenAPIV3Schema
}
