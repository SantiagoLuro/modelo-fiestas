<?php
session_start();
if (!isset($_SESSION["admin"])) {
  header("Location: login.php");
  exit;
}

$host = "127.0.0.1";
$user = "root";
$pass = "";
$db   = "peluqueria";
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) { die("Error de conexión: " . $conn->connect_error); }

$turnos    = $conn->query("SELECT * FROM turnos ORDER BY fecha ASC, hora ASC");
$bloqueos  = $conn->query("SELECT * FROM horarios_bloqueados ORDER BY fecha ASC, hora ASC");

// Helpers
function badgeEstado($estado) {
  $estado = strtolower($estado ?? '');
  $map = [
    'pendiente'  => 'badge warn',
    'confirmado' => 'badge ok',
    'cancelado'  => 'badge danger'
  ];
  $cls = $map[$estado] ?? 'badge';
  return '<span class="'.$cls.'">'.htmlspecialchars(ucfirst($estado)).'</span>';
}
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Admin | Panel</title>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg">
  <header class="topbar">
    <div class="topbar__left">
      <div class="logo sm">✂️</div>
      <div>
        <div class="app">Peluquería · Admin</div>
        <div class="muted tiny">Gestión de turnos & bloqueos</div>
      </div>
    </div>
    <div class="topbar__right">
      <span class="chip"><?= htmlspecialchars($_SESSION["admin"]) ?></span>
      <a class="btn btn-ghost" href="logout.php">Cerrar sesión</a>
    </div>
  </header>

  <main class="container">
    <section class="grid">
      <div class="card stat">
        <div class="stat__label">Turnos (próximos)</div>
        <div class="stat__value">
          <?php
            $res = $conn->query("SELECT COUNT(*) c FROM turnos WHERE fecha >= CURDATE()");
            echo (int)($res->fetch_assoc()['c'] ?? 0);
          ?>
        </div>
      </div>
      <div class="card stat">
        <div class="stat__label">Bloqueos activos</div>
        <div class="stat__value">
          <?php
            $res = $conn->query("SELECT COUNT(*) c FROM horarios_bloqueados WHERE fecha >= CURDATE()");
            echo (int)($res->fetch_assoc()['c'] ?? 0);
          ?>
        </div>
      </div>
      <div class="card stat">
        <div class="stat__label">Semana</div>
        <div class="stat__value"><?= date('W') ?></div>
      </div>
    </section>

    <section class="card">
      <div class="card__head">
        <h2>Turnos</h2>
        <div class="actions">
          <a class="btn btn-ghost" href="#" onclick="location.reload()">Actualizar</a>
        </div>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente (ID)</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Servicio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
          <?php if ($turnos && $turnos->num_rows): ?>
            <?php while($t = $turnos->fetch_assoc()): ?>
              <tr>
                <td><?= (int)$t["id"] ?></td>
                <td><?= (int)$t["usuario_id"] ?></td>
                <td><?= htmlspecialchars($t["fecha"]) ?></td>
                <td><?= htmlspecialchars(substr($t["hora"],0,5)) ?></td>
                <td><?= htmlspecialchars($t["servicio"]) ?></td>
                <td><?= badgeEstado($t["estado"]) ?></td>
              </tr>
            <?php endwhile; ?>
          <?php else: ?>
              <tr><td colspan="6" class="muted center">No hay turnos cargados.</td></tr>
          <?php endif; ?>
          </tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <div class="card__head">
        <h2>Bloqueos puntuales</h2>
        <div class="actions">
          <a class="btn btn-ghost" href="#" onclick="location.reload()">Actualizar</a>
        </div>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
          <?php if ($bloqueos && $bloqueos->num_rows): ?>
            <?php while($b = $bloqueos->fetch_assoc()): ?>
              <tr>
                <td><?= (int)$b["id"] ?></td>
                <td><?= htmlspecialchars($b["fecha"]) ?></td>
                <td><?= htmlspecialchars(substr($b["hora"],0,5)) ?></td>
                <td><?= htmlspecialchars($b["motivo"]) ?></td>
              </tr>
            <?php endwhile; ?>
          <?php else: ?>
              <tr><td colspan="4" class="muted center">No hay bloqueos registrados.</td></tr>
          <?php endif; ?>
          </tbody>
        </table>
      </div>
    </section>

  </main>

  <footer class="foot muted tiny center">© <?= date('Y') ?> Peluquería — Panel de administración</footer>
</body>
</html>
