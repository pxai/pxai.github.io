<?php

// Recibe los euros y los convierte a PTA
$euros = $_POST['conversor'];
$pesetas = $euros * 166.386;
?>
<conversor>
<euros><?php echo $euros; ?></euros>
<pesetas><?php echo $pesetas; ?></pesetas>
</conversor>