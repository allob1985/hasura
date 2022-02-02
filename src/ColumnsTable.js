import { useQuery, gql } from "@apollo/client";

const ColumnsTable = ({ role }) => {
    const GET_COLUMNS = gql`
   query fields {
  __type(name: "test") {
    fields {
      name
      type {
        ofType {
          name
        }
      }
    }
  }
}
`;
    const { data } = useQuery(GET_COLUMNS,  {
        fetchPolicy: "no-cache",
        context: {
            headers: {
                "x-hasura-role": role
            }
        },
        variables: {role}  //hotfix cache problems
    });
    if(data) {
        /*
        This query doesnt work because "test" field does not have type.
        Roleb has access only to this field and this query returns empty fields types
         */
        /*
        const GET_COLUMNS = gql`
           query fields {
          __schema {
            queryType {
              fields {
                type {
                  name
                  fields {
                    name
                    type {
                      ofType {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `;
        const resp = data.__schema && data.__schema.queryType.fields.filter(item => item.type.fields)
        let fields = [];
        resp.forEach(item => {
            item.type.fields && item.type.fields.forEach(subItem => {
                subItem.type.ofType && fields.push({
                    name: subItem.name,
                    type: subItem.type.ofType.name
                })
            })
        })*/
        const fields = data.__type.fields.map(item => {
            return {
                name: item.name,
                type: item.type.ofType.name
            }
        })
        return (
            <div>
                <h3>{role}</h3>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>
                            Column
                        </th>
                        <th>
                            Type
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields && fields.map((field) =>
                        <tr key={field.name}>
                            <td>{field.name}</td>
                            <td>{field.type}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    } else return <div></div>
};

export default ColumnsTable;
