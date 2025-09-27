#!/bin/bash

# Remove cronjob for blog automation

echo "🗑️ Removing cronjob automation..."

# Remove all automation cronjobs
crontab -l 2>/dev/null | grep -v "api/cronjob/trigger" | crontab -

echo "✅ All automation cronjobs removed!"
echo ""
echo "📋 Current cronjobs:"
crontab -l | grep "api/cronjob" || echo "  No automation cronjobs found"
