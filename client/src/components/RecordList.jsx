import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStatusColor } from "../utils/utility";

const Record = (props) => (

    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className={"p-4 align-middle [&:has([role=checkbox])]:pr-0 " + getStatusColor(props.record.application_status, props.record.date_applied)}>
          {props.record.application_status}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.company}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.job_title}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.location}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.date_applied}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.site_applied}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.posting_link}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <div className="flex gap-2">
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium 
            ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
            disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to={`/edit/${props.record._id}`}
          >
            Edit
          </Link>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium
             ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
             focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
             disabled:opacity-50 border border-input bg-background hover:bg-slate-100 
             hover:text-accent-foreground h-9 rounded-md px-3"
            color="red"
            type="button"
            onClick={() => {
              props.deleteRecord(props.record._id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
  
  export default function RecordList() {
    const [records, setRecords] = useState([]);
    const sortedRecords = [...records];
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
  
    // This method fetches the records from the database.
    useEffect(() => {
      async function getRecords() {
        const response = await fetch(`http://localhost:5050/record/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const records = await response.json();
        setRecords(records);
      }
      getRecords();
      return;
    }, [records.length]);
  
    // This method will delete a record
    async function deleteRecord(id) {
      await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE",
      });
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
    }
  
    // This method will map out the records on the table
    function recordList() {
      if (sortColumn && sortDirection) {
        sortedRecords.sort((a, b) => {
          if (sortDirection === "asc") {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
          } else {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
          }
        });
      }

      return sortedRecords.map((record) => {
        return (
          <Record
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            key={record._id}
          />
        );
      });
    }

    function handleSort(column) {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    }
  
    // This following section will display the table with the records of individuals.
    return (
      <>
        <h3 className="text-lg font-semibold p-4">Application Records</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" onClick={() => handleSort("application_status")}>
                    Application Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" onClick={() => handleSort("company")}>
                    Company
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" onClick={() => handleSort("job_title")}>
                    Job Title
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" onClick={() => handleSort("location")}>
                    Location
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" onClick={() => handleSort("date_applied")}>
                    Date Applied
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" onClick={() => handleSort("site_applied")}>
                    Site Applied
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" onClick={() => handleSort("posting_link")}>
                    Posting Link
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {recordList()}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }