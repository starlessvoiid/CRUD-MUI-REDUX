import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { addCompany, deleteCompany, getAllCompanys, selectAllCompany } from '../Redux/features/CompanySlice';



const columns = [
    { id: 'id', name: 'Id' },
    { id: 'name', name: 'Name' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone' },
    { id: 'address', name: 'Address' },
    { id: 'type', name: 'Company Type' },
    { id: 'action', name: 'Action' }
]



const Company = () => {

    const dispatch = useDispatch()

    const allCompany = useSelector(selectAllCompany)

    const [open, setOpen] = useState(false)

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('MNC');
    const [agreeTerm, setAgreeTerm] = useState(true)

    const functionAdd = () => {
        openPopup();
    }

    const closePopup = () => {
        setOpen(false)
    }
    
    const openPopup = () => {
        setOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const _obj = { id: allCompany.length + 1, name, email, phone, Address: address, type };
        console.log(_obj)
        dispatch(addCompany(_obj))
    }

    const handleRemove = (id) => {
        if (window.confirm("Do you want to remove ?"))
        dispatch(deleteCompany(id))
    }

    useEffect(() => {
        dispatch(getAllCompanys())
    }
    , [])

    console.log(allCompany)

    return (
        <div>
            <Paper sx={{margin: "1%"}}>
                <div style={{margin: "1%"}}>
                    <Button onClick={functionAdd} variant="contained">Add New (+)</Button>
                </div>
                <div style={{margin: "1%"}}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{backgroundColor: "midnightblue"}}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} style={{color: "white"}}>{column.name}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allCompany.map((company, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{company.id}</TableCell>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.email}</TableCell>
                                        <TableCell>{company.phone}</TableCell>
                                        <TableCell>{company.Address}</TableCell>
                                        <TableCell>{company.type}</TableCell>
                                        <TableCell>
                                            <Button onClick={e => {  }} variant="contained" color="primary">Edit</Button>
                                            <Button onClick={e => {handleRemove(company.id)}} variant="contained" color="error">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Paper>

            <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
                <DialogTitle>
                    <span>Create Company</span>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} margin={2}>
                            <TextField
                                required
                                error={name.length === 0}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="name" 
                                variant="outlined"
                                label="Name"
                            />
                            <TextField
                                required
                                value={email}
                                error={email.length === 0}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email" 
                                variant="outlined"
                                label="Email"
                            />
                            <TextField 
                                required
                                value={phone}
                                error={phone.length === 0}
                                onChange={(e) => setPhone(e.target.value)}
                                name="phone" 
                                variant="outlined"
                                label="Phone"
                            />
                            <TextField
                                multiline
                                maxRows={2}
                                minRows={2}
                                value={address}
                                error={address.length === 0}
                                onChange={(e) => setAddress(e.target.value)}
                                name="address" 
                                variant="outlined"
                                label="Address"
                            />
                            <RadioGroup
                                value={type}
                                onChange={(e) => {setType(e.target.value)}}
                                row
                            >
                                <FormControlLabel value="MNC" control={<Radio color="success" />} label="MNC" />
                                <FormControlLabel value="DOMESTIC" control={<Radio />} label="DOMESTIC" />
                            </RadioGroup>
                            <FormControlLabel checked={agreeTerm} onChange={(e) => setAgreeTerm(e.target.checked)} control={<Checkbox />} label="Agree Terms & Conditions" />
                            <Button disabled={!agreeTerm} variant="contained" type="submit">Submit</Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Company