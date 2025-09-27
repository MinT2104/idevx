#!/bin/bash

# Test cronjob automation

BASE_URL="http://localhost:3000"

echo "🧪 Testing cronjob automation..."
echo ""

# Test function
test_cronjob() {
    local schedule_type="$1"
    local category="$2"
    local description="$3"
    
    echo "Testing: $description ($schedule_type/$category)"
    
    response=$(curl -s -X POST "$BASE_URL/api/cronjob/trigger/$schedule_type/$category" \
        -H "Content-Type: application/json")
    
    if echo "$response" | grep -q '"success":true'; then
        echo "  ✅ Success"
        title=$(echo "$response" | grep -o '"title":"[^"]*"' | cut -d'"' -f4)
        echo "  📝 Generated: $title"
    else
        echo "  ❌ Failed"
        error=$(echo "$response" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
        echo "  🔍 Error: $error"
    fi
    echo ""
}

# Test all schedules
test_cronjob "daily" "ai-engineering" "Daily AI Engineering Update"
test_cronjob "daily" "news" "Daily AI News Update"
test_cronjob "weekly" "model-performance" "Weekly Model Performance Analysis"
test_cronjob "weekly" "infrastructure" "Weekly Infrastructure Update"
test_cronjob "monthly" "ai-models" "Monthly AI Models Review"

echo "📊 Getting cronjob statistics..."
stats_response=$(curl -s "$BASE_URL/api/cronjob/stats")

if echo "$stats_response" | grep -q '"success":true'; then
    echo "✅ Stats retrieved successfully"
    total_posts=$(echo "$stats_response" | grep -o '"totalAutomationPosts":[0-9]*' | cut -d':' -f2)
    echo "📈 Total automation posts: $total_posts"
else
    echo "❌ Failed to get stats"
fi

echo ""
echo "🔧 Available endpoints:"
echo "  • GET  $BASE_URL/api/cronjob/schedules"
echo "  • GET  $BASE_URL/api/cronjob/stats"
echo "  • POST $BASE_URL/api/cronjob/automation"
echo "  • POST $BASE_URL/api/cronjob/trigger/{scheduleType}/{category}"
