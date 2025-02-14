export async function fetchLendingData() {
  try {
    const response = await fetch("https://api.your-defi-platform.com/lending");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lending data:", error);
    return null;
  }
}
