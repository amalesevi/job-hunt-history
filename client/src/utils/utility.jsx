export function getStatusColor(status, date) {
    if ((status === "Applied" && date >= date - 60) || status === "Denied") {
      return "text-red-500";
    } else if (status === "Applied" && date >= date - 30) {
      return "text-yellow-500";
    } else if (status === "Applied") {
      return "text-lime-500";
    } else if (status === "R1 Interview") {
      return "text-sky-500";
    } else if (status === "Technical Interview") {
      return "text-purple-500";
    }
}