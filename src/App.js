
import ColumnsTable from "./ColumnsTable";

const App = () => {

  return (
    <div className="container pt-4 mt-4">
        <div className="row justify-content-around">
            <div className="col-4">
                <ColumnsTable role="rolea" />
            </div>
            <div className="col-4">
                <ColumnsTable role="roleb" />
            </div>
        </div>
    </div>
  );
}

export default App;
