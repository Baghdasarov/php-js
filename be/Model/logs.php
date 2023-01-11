<?php
class logs{
    private DbService $db;

    public function __construct()
    {
        $this->db = new DbService();
    }

    /**
     * @param int $image_id
     * @return int
     */
    public function getImageViewers(int $image_id): int
    {
        return $this->db->selectQuery("SELECT sum(view_count) FROM logs WHERE image_id = '".$image_id."'");
    }

    /**
     * @param array $credentials
     * @return bool
     */
    public function increaseViewer(array $credentials): bool
    {
        return $this->db->insertQuery("INSERT INTO logs (ip_address,user_agent,image_id) values('".$credentials['ip_address']."','".$credentials['user_agent']."','".$credentials['image_id']."') ON DUPLICATE KEY UPDATE view_count = view_count + 1");
    }
}
