"use client";

import { useState, useEffect } from "react";
import { Button } from "@/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/components/card";
import { useToast } from "@/ui/components/toast-provider";
import { Clock, Play, Square, RefreshCw, Timer } from "lucide-react";

interface CronjobStats {
  totalAutomationPosts: number;
  postsByStatus: Array<{
    status: string;
    count: number;
  }>;
  recentPosts: Array<{
    id: string;
    title: string;
    status: string;
    createdAt: string;
  }>;
}

interface RotationState {
  currentIndex: number;
  lastRun: Date | null;
  nextCategory: string;
  categories: string[];
}

interface CronjobStatus {
  isRunning: boolean;
  interval: string | null;
  nextRunTime: string | null;
  scheduler: string;
  jobStats: {
    running: number;
    completed: number;
    failed: number;
    scheduled: number;
  };
}

export default function SimpleCronjobManager() {
  const [stats, setStats] = useState<CronjobStats | null>(null);
  const [rotationState, setRotationState] = useState<RotationState | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [cronjobStatus, setCronjobStatus] = useState<CronjobStatus | null>(
    null
  );
  const { success, error } = useToast();

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/cronjob/stats");
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  // Fetch rotation state
  const fetchRotation = async () => {
    try {
      const response = await fetch("/api/cronjob/rotation");
      const data = await response.json();
      if (data.success) {
        setRotationState({
          currentIndex: data.data.currentIndex,
          lastRun: data.data.lastRun ? new Date(data.data.lastRun) : null,
          nextCategory: data.data.nextCategory,
          categories: data.data.categories,
        });
      }
    } catch (err) {
      console.error("Failed to fetch rotation:", err);
    }
  };

  // Fetch cronjob status
  const fetchCronjobStatus = async () => {
    try {
      const response = await fetch("/api/cronjob/control");
      const data = await response.json();
      if (data.success) {
        setIsRunning(data.data.isRunning);
      }
    } catch (err) {
      console.error("Failed to fetch cronjob status:", err);
    }
  };

  // Start cronjob
  const startCronjob = async () => {
    try {
      const response = await fetch("/api/cronjob/control", {
        method: "POST",
      });
      const result = await response.json();

      if (result.success) {
        setIsRunning(true);
        success("Cronjob Started", "Automated blog generation is now running");
      } else {
        error("Failed to Start", result.error);
      }
    } catch (err) {
      error("Network Error", "Failed to start cronjob");
    }
  };

  // Stop cronjob
  const stopCronjob = async () => {
    try {
      const response = await fetch("/api/cronjob/control", {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        setIsRunning(false);
        success(
          "Cronjob Stopped",
          "Automated blog generation has been stopped"
        );
      } else {
        error("Failed to Stop", result.error);
      }
    } catch (err) {
      error("Network Error", "Failed to stop cronjob");
    }
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchRotation(), fetchCronjobStatus()]);
      setLoading(false);
    };

    loadData();
  }, []);

  // Manual refresh
  const handleRefresh = async () => {
    await Promise.all([fetchStats(), fetchRotation(), fetchCronjobStatus()]);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
          <span className="ml-3 text-gray-600">Loading...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Clock className="h-6 w-6 mr-2 text-blue-600" />
            AI Blog Automation
          </CardTitle>
          <CardDescription>
            Simple server-side cronjob for automated blog post generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {stats?.totalAutomationPosts || 0}
              </div>
              <div className="text-sm text-blue-600">Total Posts</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats?.postsByStatus?.find((p) => p.status === "published")
                  ?.count || 0}
              </div>
              <div className="text-sm text-green-600">Published</div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {stats?.postsByStatus?.find((p) => p.status === "draft")
                  ?.count || 0}
              </div>
              <div className="text-sm text-yellow-600">Drafts</div>
            </div>
          </div>

          {/* Cronjob Status */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-800">
                Cronjob Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Status:</p>
                  <p
                    className={`font-bold ${isRunning ? "text-green-600" : "text-red-600"}`}
                  >
                    {isRunning ? "RUNNING" : "STOPPED"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interval:</p>
                  <p className="font-bold">5 minutes</p>
                </div>
              </div>

              {rotationState && (
                <div>
                  <p className="text-sm text-gray-600">Next Category:</p>
                  <p className="font-bold capitalize">
                    {rotationState.nextCategory.replace("-", " ")}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center space-x-4">
                {!isRunning ? (
                  <Button
                    onClick={startCronjob}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  >
                    Start Cronjob
                  </Button>
                ) : (
                  <Button
                    onClick={stopCronjob}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
                  >
                    Stop Cronjob
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Category Rotation */}
          {rotationState && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Category Rotation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {rotationState.categories.map((category, index) => (
                    <span
                      key={category}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        index === rotationState.currentIndex
                          ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {index === rotationState.currentIndex && "🔄 "}
                      {category.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Posts */}
          {stats?.recentPosts && stats.recentPosts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Recent Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.recentPosts.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Refresh Button */}
          <div className="flex justify-end">
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
