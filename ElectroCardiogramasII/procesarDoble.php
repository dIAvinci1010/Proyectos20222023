<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Procesar los datos recibidos del formulario
    $yValues = array();
    function limpiarCSV($archivo){
    $yValues = array();
        if (($gestor = fopen($archivo, 'r')) !== false) {
            while (($fila = fgetcsv($gestor, 1000, ',')) !== false) {
                $filaFiltrada = array_filter($fila, function($valor) {
                    return preg_match('/^-?\d*\d+$/', $valor);
                });
                $filaFiltrada= implode(', ', $filaFiltrada);
                $filaFiltrada = str_replace(", ", ".",$filaFiltrada);
                if(!$filaFiltrada == ""){
                    $yValues[] = floatval($filaFiltrada);
                }
            }
            fclose($gestor);
        }
        return $yValues;
    }
    $k = 0;
    foreach ($_FILES as $archivo) {
        for($i=0;$i<count($archivo["tmp_name"]);$i++){
            $extension = strtolower(pathinfo($archivo["name"][$i], PATHINFO_EXTENSION));
            
            if ($extension !== 'csv') {
                // Mostrar un mensaje de error para archivos que no sean de tipo CSV
                echo "Error: El archivo " . $archivo["name"][$i] . " debe ser de tipo CSV.";
                continue;
            }
            array_push($yValues,limpiarCSV($archivo["tmp_name"][$i]));
            // Obtener el nombre del archivo
            $nombreArchivo = $archivo["name"][$i];
                    // Construir el arreglo de datos para el gráfico, incluyendo el nombre del archivo
        $dataPoints[$k] = [
            'name' => $nombreArchivo,
            'data' => [],
        ];
        for ($j = 0; $j < count($yValues[$k]); $j++) {
            $dataPoints[$k]['data'][$j] = [
                'x' => $j * 0.0019,
                'y' => $yValues[$k][$j]
            ];
        }
        }
    $k++;
    }
    // Convertir los datos a formato JSON
   
    $jsonData = json_encode($dataPoints, JSON_NUMERIC_CHECK);
    
    // Devolver la respuesta como salida del script
    echo $jsonData;
} else {
    // Si no se recibió una solicitud POST, mostrar un mensaje de error
    echo "Error: No se ha enviado ningún formulario.";
}
?>
