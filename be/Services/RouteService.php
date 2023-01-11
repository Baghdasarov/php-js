<?php

class RouteService {
    /**
     * @return string[]
     */
    public function requestHandle(): array
    {
        foreach (ROUTES[$_SERVER["REQUEST_METHOD"]] as $item) {
            if ($item['path'] === $_SERVER['PATH_INFO']) {
                return $item;
            }
        }

        http_response_code(404);
        return [];
    }
}
