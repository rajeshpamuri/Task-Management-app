package com.rajesh;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.cloud.gateway.server.mvc.filter.LoadBalancerFilterFunctions;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class GatewayConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",
                "https://task-management-omega-dusky.vercel.app"
        ));
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        corsConfig.setAllowCredentials(true);
        corsConfig.setAllowedHeaders(Collections.singletonList("*"));
        corsConfig.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        corsConfig.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsFilter(source);
    }

    @Bean
    public RouterFunction<ServerResponse> userServiceRoutes() {
        return GatewayRouterFunctions.route("USER-SERVICE-ROUTE")
                .route(RequestPredicates.path("/auth/**"), HandlerFunctions.http())
                .route(RequestPredicates.path("/user/**"), HandlerFunctions.http())
                .route(RequestPredicates.path("/api/user/**"), HandlerFunctions.http())
                .filter(LoadBalancerFilterFunctions.lb("USER-SERVICE"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> taskServiceRoutes()  {
        return GatewayRouterFunctions.route("TASK-SERVICE-ROUTE")
                .route(RequestPredicates.path("/api/task/**"), HandlerFunctions.http())
                .route(RequestPredicates.path("/task/**"), HandlerFunctions.http())
                .filter(LoadBalancerFilterFunctions.lb("TASK-SERVICE"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> submissionServiceRoutes() {
        return GatewayRouterFunctions.route("SUBMISSION-SERVICE-ROUTE")
                .route(RequestPredicates.path("/api/submissions/**"), HandlerFunctions.http())
                .route(RequestPredicates.path("/submissions/**"), HandlerFunctions.http())
                .filter(LoadBalancerFilterFunctions.lb("USER-SUBMISSION-SERVICE"))
                .build();
    }
}