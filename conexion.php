<?php
header("Content-Type: application/json");
include 'conexion.php';

$sql = "SELECT torre, apartamento, medidor, estado FROM medidores";
$result = $conn->query($sql);

$medidores = [];

while ($row = $result->fetch_assoc()) {
    $medidores[] = $row;
}

echo json_encode($medidores);

$conn->close();
?>
