
#!/bin/bash

LOGFILE="monitor.log"

echo "=== Monitoring started at $(date) ===" | tee -a "$LOGFILE"

while true; do
  echo "" | tee -a "$LOGFILE"
  echo "===== $(date) =====" | tee -a "$LOGFILE"

  # CPU ממוצע (כל הליבות)
  mpstat 1 1 | awk '/Average.*all/ {printf "CPU used: %.1f%%\n", 100-$12}' | tee -a "$LOGFILE"

  # RAM
  free -h | awk 'NR==2{printf "RAM used: %.1f%% (%s/%s)\n", $3*100/$2, $3, $2}' | tee -a "$LOGFILE"

  # תהליכים הכי כבדים
  echo "--- Top CPU processes ---" | tee -a "$LOGFILE"
  ps aux --sort=-%cpu | head -n 6 | tee -a "$LOGFILE"

  echo "--- Top MEM processes ---" | tee -a "$LOGFILE"
  ps aux --sort=-%mem | head -n 6 | tee -a "$LOGFILE"

  sleep 5
done

