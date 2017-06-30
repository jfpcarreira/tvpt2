function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("HTTP_GET",      "get");
define("HTTP_POST",     "post");
define("HTTP_PUT",      "put");
define("HTTP_DELETE",   "delete");
