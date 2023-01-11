<?php

class MainController {
    private logs $logs;

    public function __construct()
    {
        $this->logs = new logs();
    }

    /**
     * @return string'
     * @throws Exception
     */
    public function getRandomImageId(): string
    {
        return json_encode(["image_id" => random_int(1, 4)], JSON_THROW_ON_ERROR);
    }

    /**
     * @return string
     * @throws JsonException
     */
    public function getTotalViewers(): string
    {
        $imageId = request_get('image_id');

        $response = [
            "image_id" => $imageId,
            "total_viewer_count" => $this->logs->getImageViewers($imageId)
        ];

        return json_encode($response, JSON_THROW_ON_ERROR);
    }

    /**
     * @return bool
     */
    public function increaseViewer(): bool
    {
        $imageId = request_post('image_id');

        $credentials = [
            "image_id" => $imageId,
            "ip_address" => $_SERVER['REMOTE_ADDR'],
            "user_agent" => $_SERVER['HTTP_USER_AGENT']
        ];

        return $this->logs->increaseViewer($credentials);
    }
}
