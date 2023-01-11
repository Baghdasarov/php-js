<?php

class DbService
{
    protected ?mysqli $con = NULL;

    public function __construct()
    {
        try {
            $this->con = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

            if ( mysqli_connect_errno()) {
                throw new Exception("Database connection failed.");
            }
        } catch (Exception $e) {
            throw new \RuntimeException($e->getMessage());
        }

    }

    /**
     * @param string $queryString
     * @return mixed
     */
    public function selectQuery(string $queryString)
    {
        $query = $this->con->query($queryString);
        foreach ($query->fetch_row() as $item) {
            $result = $item;
        }
        return $result;
    }

    /**
     * @param string $query
     * @return mysqli_result|bool
     */
    public function insertQuery(string $query): mysqli_result|bool
    {
        return $this->con->query($query);
    }
}
