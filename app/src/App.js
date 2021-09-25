import "./css/bootstrap.min.css";
import "./css/responsive.css";
import "./css/style.css";

function App() {
  return (
      <section className="blog-area section-padding-100-0">
        <div className="container">
          <form>
            <div className="row">
              <div className="col">
                <label>From</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col">
                <label>To</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col">
                <label>Group by</label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div className="row mt-30">
              <div className="col">
                <label>Platform</label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="col">
                <label>Operating system</label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="col">
                <label>Browser</label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
          </form>
          <div className="table-responsive mt-30">
            <div className="info">
            </div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Impressions</th>
                <th scope="col">Conversions</th>
                <th scope="col">Money</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
              </tr>
              <tr>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
              </tr>
              <tr>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
                <td>ndjfjdn</td>
              </tr>
              </tbody>
            </table>
          </div>
          <nav>
            <ul className="pagination float-right mt-10 mb-40">
              <li className="page-item black">
                <div className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </div>
              </li>
              <li className="page-item"><div className="page-link">1</div></li>
              <li className="page-item active"><div className="page-link">2</div></li>
              <li className="page-item"><div className="page-link">3</div></li>
              <li className="page-item">
                <div className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </section>
  );
}

export default App;
