import React, { useEffect } from "react";
import classes from "./IssueBookList.module.css";
import { Link } from 'react-router-dom';

const IssueBookList = ({ issueBooks, setIssueBooks }) => {
  // console.log("Issue Books", issueBooks);
  useEffect(() => {
    fetch(`https://odd-ray-vestments.cyclic.app/getIssueBooks`)
      .then((res) => res.json())
      .then((issueBook) => setIssueBooks(issueBook));
  }, [issueBooks, setIssueBooks]);
  return (
    <div className="mt-5">
      <table className={`${classes.issueTable} table table-striped`}>
        <thead className={`${classes.tableHead}`}>
          <tr>
            <th scope="col">Student</th>
            <th scope="col">Book</th>
            <th scope="col">Dep.</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className={`${classes.tableBody}`}>
          {issueBooks.map((book ,key) => (
            <tr>
              <td>{book.studentName}</td>
              <td>{book.bookName}</td>
              <td>{book.department}</td>
              <td>
                <div>
                  <Link className={`${classes.seeMoreButton}`} to={"/bookId/"+book._id}>See More</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueBookList;
