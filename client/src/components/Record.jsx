import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    application_status: "",
    company: "",
    job_title: "",
    location: "",
    date_applied: "",
    site_applied: "",
    posting_link: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const job = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ 
        application_status: "",
        company: "",
        job_title: "",
        location: "",
        date_applied: "",
        site_applied: "",
        posting_link: "", });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Job Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Job Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Status of Application</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="statusApplied"
                      name="statusApplied"
                      type="radio"
                      value="Applied"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.application_status === "Applied"}
                      onChange={(e) => updateForm({ application_status: e.target.value })}
                    />
                    <label
                      htmlFor="statusApplied"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Applied
                    </label>
                    <input
                      id="statusDenied"
                      name="statusDenied"
                      type="radio"
                      value="Denied"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.application_status === "Denied"}
                      onChange={(e) => updateForm({ application_status: e.target.value })}
                    />
                    <label
                      htmlFor="statusDenied"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Denied
                    </label>
                    <input
                      id="statusR1Interview"
                      name="statusR1Interview"
                      type="radio"
                      value="R1 Interview"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.application_status === "R1 Interview"}
                      onChange={(e) => updateForm({ application_status: e.target.value })}
                    />
                    <label
                      htmlFor="statusR1Interview"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      R1 Interview
                    </label>
                    <input
                      id="statusTechnicalInterview"
                      name="statusTechnicalInterview"
                      type="radio"
                      value="Technical Interview"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.application_status === "Technical Interview"}
                      onChange={(e) => updateForm({ application_status: e.target.value })}
                    />
                    <label
                      htmlFor="statusTechnicalInterview"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Technical Interview
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="company"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Company
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset 
                ring-slate-300 focus-within:ring-2 focus-within:ring-inset 
                focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={(e) => updateForm({ company: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="job_title"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Job Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="job_title"
                    id="job_title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Title of Job"
                    value={form.job_title}
                    onChange={(e) => updateForm({ job_title: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Job Location
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Location of Job"
                    value={form.location}
                    onChange={(e) => updateForm({ location: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="date_applied"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Date Applied
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                    type="date"
                    name="date_applied"
                    id="date_applied"
                    value={form.date_applied}
                    min="2024-01-01"
                    max="2025-12-31"
                    onChange={(e) => updateForm({ date_applied: e.target.value })} 
                />
                </div>
              </div>
            </div>

            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Site Applied On</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="siteLinkedin"
                      name="siteLinkedin"
                      type="radio"
                      value="LinkedIn"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.site_applied === "LinkedIn"}
                      onChange={(e) => updateForm({ site_applied: e.target.value })}
                    />
                    <label
                      htmlFor="siteLinkedIn"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      LinkedIn
                    </label>
                    <input
                      id="siteIndeed"
                      name="siteIndeed"
                      type="radio"
                      value="Indeed"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.site_applied === "Indeed"}
                      onChange={(e) => updateForm({ site_applied: e.target.value })}
                    />
                    <label
                      htmlFor="siteIndeed"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Indeed
                    </label>
                    <input
                      id="siteGlassdoor"
                      name="siteGlassdoor"
                      type="radio"
                      value="Glassdoor"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.site_applied === "Glassdoor"}
                      onChange={(e) => updateForm({ site_applied: e.target.value })}
                    />
                    <label
                      htmlFor="siteGlassdoor"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Glassdoor
                    </label>
                    <input
                      id="siteBuiltIn"
                      name="siteBuiltIn"
                      type="radio"
                      value="BuiltIn"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.site_applied === "BuiltIn"}
                      onChange={(e) => updateForm({ site_applied: e.target.value })}
                    />
                    <label
                      htmlFor="siteBuiltIn"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      BuiltIn
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="posting_link"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Posting Link
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="posting_link"
                    id="posting_link"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Posting link"
                    value={form.posting_link}
                    onChange={(e) => updateForm({ posting_link: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Job"
          className="inline-flex items-center justify-center whitespace-nowrap text-md 
          font-medium ring-offset-background transition-colors focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:pointer-events-none disabled:opacity-50 border border-input bg-background 
          hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}