import ballerina.net.http;

@http:configuration {basePath:"/echo"}
service<http> echo {

    @http:resourceConfig {
        methods:["GET"],
        path:"/"
    }
    resource echo (message m) {
        http:convertToResponse(m);
        reply m;
    
    }
    
}
