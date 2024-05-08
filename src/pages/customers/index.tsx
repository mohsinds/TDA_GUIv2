import PageTitle from "@/components/TextDisplay/PageTitle"
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { BorderBottom } from "@mui/icons-material";
import axios from "axios";

interface Customer {
    id: number;
    name: string;
    login: string;
  }
const backendApiUrl = process.env.BACKEND_API_URL ?? 'http://localhost:5000'
const backendApiToken = process.env.BACKEND_API_TOKEN ?? 'set-your-token-in-the-.env-file'
  const CustomersPage: React.FC = () => {
    const [customers, setCustomers] = React.useState<Customer[]>([]);

    const [headers, setHeaders] = React.useState<string[]>(["Customer","Login","Edit Login"]);

    const [editingCustomerId, setEditingCustomerId] = React.useState<number | null>(null);

    const handleLoginChange = (customerId: number, newLogin: string) => {
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer.id === customerId ? { ...customer, login: newLogin } : customer
          )
        );
      };

      const toggleEditMode = (customerId: any) => {
        setEditingCustomerId(prevId => (prevId === customerId ? null : customerId));
      };

      const handleSave = (customerId: number) => {
        setEditingCustomerId(null);
        console.log("customer",customers,customerId);
      };

      React.useEffect(() => {
          handleCustomerList();
      }, []);
      const handleCustomerList = async()=>{
          const source = axios?.CancelToken?.source();
          try{

              const res = await axios.get(`${backendApiUrl}/customer/list`,
                  {
                      headers: {
                          Authorization: `Bearer ${backendApiToken}`,
                      },
                  });
              if(res?.data?.length > 0){
                  let updatedArr = res?.data?.map(({Name,CounterpartyID}: any) => {
                      return {
                          id:CounterpartyID,
                          name:Name,
                          login:""
                      };
                  });
                  setCustomers(updatedArr);
              }else{
                  setCustomers([])
              }
          }catch(e){
              setCustomers([])
          }


      }
  return (
    <>
    <div className="tableContainer" style={{background:'#212121',height:'auto',maxHeight:'20rem',overflowY:'auto',overflowX:'hidden',width:'24.5rem',paddingLeft:10,paddingBottom:10}}>
      <table style={{borderLeft:'1px solid #464646',borderRight:'1px solid #464646'}}>
        <thead>
          <tr>
            {headers.map((header,i) => (
              <th key={i} style={{padding:10,borderBottom:'1px solid #464646',whiteSpace:'nowrap'}}>
                <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    {i == 1 && <div style={{marginRight:5,width:2,height:15,background:'#464646'}}></div>}
                    <div>{header}</div>
                    {i > 0 && <div style={{marginLeft:14,width:2,height:15,background:'#464646'}}></div>}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer?.id}>
              <td style={{padding:8,borderBottom:'1px solid #464646'}} >{customer?.name}</td>
              <td style={{padding:8,borderBottom:'1px solid #464646',background:editingCustomerId===customer.id ? '#424242':''}}>
              <input
                  type="text"
                  value={customer.login}
                  disabled={editingCustomerId !== customer.id}
                  style={{border:'none',background:'transparent',color:'white',textAlign:'center',width:'8rem'}}
                  onChange={e => handleLoginChange(customer.id, e.target.value)}
                />
              </td >
              <td style={{textAlign:'center',padding:8,borderBottom:'1px solid #464646',background:editingCustomerId===customer.id ? '#424242':''}}>
              {editingCustomerId === customer.id ? (
                  <>
                    <SaveIcon onClick={() => handleSave(customer.id)} style={{cursor:'pointer',color: '#89C9F6'}} />
                    <CloseIcon onClick={() => toggleEditMode(null)} style={{cursor:'pointer',marginLeft:10}} />
                  </>
                ) : (
                    <EditIcon onClick={() => toggleEditMode(customer.id)} style={{cursor:'pointer'}}/>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default CustomersPage;