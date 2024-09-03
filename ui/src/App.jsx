import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";

import { abi } from './scdata/Cert.json';
import { CertModuleCert } from './scdata/deployed_addresses.json';

function App() {
  // State variables for form inputs
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");
  const [searchCertiId, setSearchCertiId] = useState("");

  const provider = new BrowserProvider(window.ethereum);

  async function connectToMetamask() {
    const signer = await provider.getSigner();
    console.log("Address", signer.address);
  }

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Course:", course);
    console.log("Certificate ID:", id);
    console.log("Candidate Name:", name);
    console.log("Grade:", grade);
    console.log("Issue Date:", date);

    const signer = await provider.getSigner();
    const instance = new Contract(CertModuleCert, abi, signer);

    const txl = await instance.issue(id, name, course, grade, date);

    console.log('transaction:', txl)
  };

  // Search button click handler
  const handleSearch = () => {
    console.log("Searching Certificate ID:", searchCertiId);
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center">
        <h1 className="font-extrabold text-3xl mb-7">Certificate DApp</h1>
        <div className="container mx-auto p-8">
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <button
              className="w-full bg-orange-700 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              type="submit"
              onClick={connectToMetamask}
            >
              Connect to Metamask
            </button>
            <h3 className="text-3xl font-bold text-center mb-4">
              Issue New Certificate
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-lg font-medium mb-2"
                    htmlFor="course"
                  >
                    Select Course *
                  </label>
                  <select
                    className="w-full border-2 border-gray-300 rounded-md p-2"
                    name="course"
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                  >
                    <option value="">Select Course</option>
                    <option>Certified Blockchain Associate</option>
                    <option>Certified Ethereum Developer</option>
                    <option>Blockchain Foundation</option>
                    <option>Ethereum Fundamentals</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-2"
                    htmlFor="certiid"
                  >
                    Certificate ID *
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-md p-2"
                    name="certiid"
                    id="id"
                    placeholder="Certificate ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-2"
                    htmlFor="name"
                  >
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-md p-2"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-2"
                    htmlFor="grade"
                  >
                    Select Grade *
                  </label>
                  <select
                    className="w-full border-2 border-gray-300 rounded-md p-2"
                    name="grade"
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                  >
                    <option value="">Select Grade</option>
                    <option>S</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-2"
                    htmlFor="date"
                  >
                    Issue Date *
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-md p-2"
                    id="date"
                    name="date"
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    className="w-full bg-orange-700 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                    type="submit"
                  >
                    Issue Certificate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

   
        <input
          type="text"
          id="CertificateID"
          name="CertificateID"
          className="border-2 border-zinc-950 mb-2"
          placeholder="Enter Certificate ID to View"
          value={searchCertiId}
          onChange={(e) => setSearchCertiId(e.target.value)}
        />
        <button
          className="border-1 bg-cyan-700 px-8 py-4 rounded text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default App;
