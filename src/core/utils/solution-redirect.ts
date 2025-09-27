/**
 * Check if a solution exists and redirect accordingly
 * @param solutionKey - The solution key to check
 * @param redirectPath - The path to redirect to if solution exists (e.g., "/agent/research")
 * @param fallbackPath - The fallback path if solution doesn't exist (default: "/quotation")
 */
export async function checkSolutionAndRedirect(
  solutionKey: string,
  redirectPath: string,
  fallbackPath: string = "/talk-to-us"
) {
  try {
    // Check if solution exists
    const response = await fetch(`/api/solutions/check/${solutionKey}`);
    const data = await response.json();

    if (data.exists) {
      // Solution exists, redirect to the intended page
      window.location.href = redirectPath;
    } else {
      // Solution doesn't exist, redirect to quotation
      window.location.href = fallbackPath;
    }
  } catch (error) {
    console.error("Error checking solution:", error);
    // On error, redirect to quotation as fallback
    window.location.href = fallbackPath;
  }
}

/**
 * Hook for React components to handle solution checking and redirect
 * @param solutionKey - The solution key to check
 * @param redirectPath - The path to redirect to if solution exists
 * @param fallbackPath - The fallback path if solution doesn't exist
 */
export function useSolutionRedirect(
  solutionKey: string,
  redirectPath: string,
  fallbackPath: string = "/quotation"
) {
  return () =>
    checkSolutionAndRedirect(solutionKey, redirectPath, fallbackPath);
}
