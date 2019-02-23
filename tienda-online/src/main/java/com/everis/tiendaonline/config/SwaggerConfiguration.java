package com.everis.tiendaonline.config;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * This class provides common configuration to enable Swagger in micro services,
 * and adds the default configuration for Hague platform. For a secured api, a
 * valid HTTP header "Authorization" must be provided.
 *
 * @See hague-auth-server
 */
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

	/**
	 * Configures Swagger to not document the default endpoints added by Spring.
	 *
	 * @return the docket
	 */
	@Bean
	public Docket swaggerSpringMvcPlugin() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(new ApiInfoBuilder().build())
				.securityContexts(configureSecurityContext()).securitySchemes(configureSecurityScheme()).select()
				.apis(apis()).build();
	}

	/**
	 * Apis.
	 *
	 * @return the predicate
	 */
	private Predicate<RequestHandler> apis() {
		return Predicates.not(RequestHandlerSelectors.basePackage("org.springframework"));
	}

	/**
	 * Configures the security context.
	 *
	 * @return the security context' list
	 */
	private List<SecurityContext> configureSecurityContext() {
		final AuthorizationScope[] scopes = new AuthorizationScope[] {
				new AuthorizationScope(AuthorizationConstants.SECURITY_SCOPE, AuthorizationConstants.SECURITY_SCOPE) };

		final SecurityReference[] securityReferences = new SecurityReference[] { SecurityReference.builder()
				.reference(AuthorizationConstants.AUTHORIZATION_HEADER).scopes(scopes).build() };

		final SecurityContext securityContext = SecurityContext.builder().forPaths(Predicates.alwaysTrue())
				.securityReferences(Arrays.asList(securityReferences)).build();

		final List<SecurityContext> securityContexts = new ArrayList<>();
		securityContexts.add(securityContext);
		return securityContexts;
	}

	/**
	 * Configures the security scheme.
	 *
	 * @return the security scheme' list
	 */
	private List<? extends SecurityScheme> configureSecurityScheme() {
		final List<ApiKey> securitySchemes = new ArrayList<>();
		securitySchemes.add(new ApiKey(AuthorizationConstants.AUTHORIZATION_HEADER,
				AuthorizationConstants.AUTHORIZATION_HEADER, ApiKeyVehicle.HEADER.getValue()));
		return securitySchemes;
	}
}
