import * as React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material';

type Row = {
    id: number;
    lastName: string;
    firstName: string | null;
    age: number | null;
  };

interface DataTableStructure {
  rows: Row[];
}

const DataTable: React.FC<DataTableStructure> = ( { rows } ) => {
    
  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: 'Open Sans',
            fontSize: '14px',
            fontWeight: 400,
          },
        },
      },
    },
  });
  
    return (
        <>
          <ThemeProvider theme={theme}>
              <Table
                sx={{
                  border: "1px solid black",
                  width: "500px",
                  borderRadius: "40em"
                }}
              
              >
                <TableHead>
                  <TableRow>
                  <TableCell 
                  padding='checkbox'
                  >
                      <Checkbox></Checkbox>
                  </TableCell>
                  <TableCell>

                  </TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                {rows.map ((row)=> (
                  <TableRow key={row.id}>
                    
                    <TableCell
                      padding='checkbox'
                    >  
                      <Checkbox></Checkbox>
                    </TableCell>
                    <TableCell>
                      {row.id}{row.age}{row.lastName}{row.firstName}
                    </TableCell>
                  </TableRow>
                ) )}
                </TableBody>
              </Table>
          </ThemeProvider>
        </>
      );
    };

export default DataTable