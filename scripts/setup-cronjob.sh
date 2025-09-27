#!/bin/bash

# Setup cronjob for blog automation
# This script sets up automated blog post generation

echo "🤖 Setting up cronjob for blog automation..."

# Get the current directory (project root)
PROJECT_DIR=$(pwd)
CRONJOB_URL="http://localhost:3000"

# Function to add cronjob
add_cronjob() {
    local schedule="$1"
    local schedule_type="$2"
    local category="$3"
    local description="$4"
    
    echo "Adding cronjob: $schedule - $description"
    
    # Add to crontab
    (crontab -l 2>/dev/null; echo "$schedule curl -X POST $CRONJOB_URL/api/cronjob/trigger/$schedule_type/$category -H 'Content-Type: application/json' > /dev/null 2>&1") | crontab -
}

# Clear existing automation cronjobs
echo "Clearing existing automation cronjobs..."
crontab -l 2>/dev/null | grep -v "api/cronjob/trigger" | crontab -

# Daily automation (9 AM every day)
add_cronjob "0 9 * * *" "daily" "ai-engineering" "Daily AI Engineering Update"
add_cronjob "30 9 * * *" "daily" "news" "Daily AI News Update"

# Weekly automation (Monday 10 AM)
add_cronjob "0 10 * * 1" "weekly" "model-performance" "Weekly Model Performance Analysis"
add_cronjob "30 10 * * 1" "weekly" "infrastructure" "Weekly Infrastructure Update"

# Monthly automation (1st of month at 11 AM)
add_cronjob "0 11 1 * *" "monthly" "ai-models" "Monthly AI Models Review"

echo ""
echo "✅ Cronjob setup completed!"
echo ""
echo "📅 Scheduled automation:"
echo "  • Daily (9:00 AM): AI Engineering & News updates"
echo "  • Weekly (Monday 10:00 AM): Model Performance & Infrastructure"
echo "  • Monthly (1st 11:00 AM): AI Models review"
echo ""
echo "🔧 Management commands:"
echo "  • View cronjobs: crontab -l"
echo "  • Edit cronjobs: crontab -e"
echo "  • Remove all automation: ./scripts/remove-cronjob.sh"
echo ""
echo "🧪 Test commands:"
echo "  • Test daily AI engineering: curl -X POST $CRONJOB_URL/api/cronjob/trigger/daily/ai-engineering"
echo "  • Test daily news: curl -X POST $CRONJOB_URL/api/cronjob/trigger/daily/news"
echo "  • View stats: curl $CRONJOB_URL/api/cronjob/stats"
echo ""

# Show current cronjobs
echo "📋 Current cronjobs:"
crontab -l | grep "api/cronjob" || echo "  No automation cronjobs found"
