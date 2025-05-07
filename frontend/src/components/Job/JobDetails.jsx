import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container box-container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            <strong>Title:</strong> <span> {job.title}</span>
          </p>
          <p>
            <strong>Category:</strong> <span>{job.category}</span>
          </p>
          <p>
            <strong>Country:</strong> <span>{job.country}</span>
          </p>
          <p>
            <strong>City:</strong> <span>{job.city}</span>
          </p>
          <p>
            <strong>Location:</strong> <span>{job.location}</span>
          </p>
          <p>
            <strong>Description:</strong> <span>{job.description}</span>
          </p>
          <p>
            <strong>Job Posted On:</strong> <span>{job.jobPostedOn}</span>
          </p>
          <p>
            <strong>Salary:</strong> {" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
