# Migration auf neuen Windows-PC

Dieses Dokument listet große bzw. lokale Verzeichnisse und deren Migrationsstatus.

## Klassifikation

| Ordner | Klassifikation | Empfehlung |
|---|---|---|
| `.venv/` | regenerierbar | Auf Zielsystem per `./scripts/bootstrap.ps1` neu erzeugen |
| `.venv-win/` | regenerierbar | Nicht migrieren, lokal neu erzeugen |
| `site/` | regenerierbar | Nicht migrieren, per `mkdocs build --clean` neu erzeugen |
| `docs/assets/audiofiles/local/` | manuell migrieren | Extern ablegen und lokal zurückkopieren |

## Manuell zu migrierende Ordner

- `docs/assets/audiofiles/local/`

## Empfohlener externer Pfad (Windows)

- `%USERPROFILE%/Documents/SpanischeLinguistik-local-assets/audiofiles/`

## Verbindliche Regel

Die manuell migrierten lokalen Daten bleiben gitignored und werden nicht ins Repository committed.