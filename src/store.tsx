import { createStore } from 'redux';
import {
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { faker } from '@faker-js/faker';

/**
 * The initial state of the application.
 */
const initialState: AppState = {
  companyData: [],
  tableColumnConfig: [],
  selectedRow: {} as CompanyType
};

/**
 * The reducer function.
 * It takes the current state and an action, and returns the new state based on the action type.
 * @param state - The current state of the application.
 * @param action - The action object that contains the type and payload.
 * @returns The new state after applying the action.
 */

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_COMPANY':
      return {
        ...state,
        companyData: [...state.companyData, ...action.payload],
      };
    case 'COMPANY_TABLE_COLUMN_CONFIG':
        return {
          ...state,
          tableColumnConfig: [...state.tableColumnConfig, ...action.payload],
    };
    case 'SELECTED_ROW':
       return {
         ...state,
         selectedRow: action.payload
       } 
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

const columnsConfig: MRT_ColumnDef<CompanyType>[] = [
    {
      accessorKey: 'companyName',
      header: 'Company Name',
      size: 150,
    },
    {
      accessorKey: 'address',
      header: 'Address',
      size: 100,
    },
    {
      accessorKey: 'registrationDate',
      header: 'Registration Date',
      size: 100,
    },
    {
      accessorKey: 'numberOfEmployees',
      header: 'Employees',
      size: 70,
    },
    {
      accessorKey: 'raisedCapital',
      header: 'Raised Capital',
      size: 120,
    },
    {
      accessorKey: 'turnover',
      header: 'Turnover',
      size: 100,
    },
    {
      accessorKey: 'netProfit',
      header: 'Net Profit',
      size: 120
    },
    {
      accessorKey: 'contactNumber',
      header: 'Contact Number',
      size: 120,
    },
    {
      accessorKey: 'contactEmail',
      header: 'Contact Email',
      size: 150
    },
    {
      accessorKey: 'companyWebsite',
      header: 'Website',
      size: 350,
    },
    {
      accessorKey: 'loanAmount',
      header: 'Loan Amount',
    },
    {
      accessorKey: 'loanInterest',
      header: 'Loan Interest',
      size: 150,
    },
    {
      accessorKey: 'accountStatus',
      header: 'Status',
    }
  ];

store.dispatch({ type: 'COMPANY_TABLE_COLUMN_CONFIG', payload: columnsConfig });

/**
 * Generates fake company data.
 * @param numberOfRows - The number of rows of data to generate.
 * @returns An array of generated company data.
 */
export const createCompanyData = (numberOfRows: number): CompanyType[] => {
  const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return Array.from({ length: numberOfRows }, () => ({
    companyName: faker.company.name(),
    address: faker.address.streetAddress(),
    registrationDate: faker.date.past().toISOString(),
    numberOfEmployees: faker.datatype.number({ min: 1, max: 100 }),
    raisedCapital: formatCurrency(faker.datatype.float({ min: 10000, max: 100000 })),
    turnover: formatCurrency(faker.datatype.float({ min: 10000, max: 100000 })),
    netProfit: formatCurrency(faker.datatype.float({ min: 10000, max: 100000 })),
    contactNumber: faker.phone.number(),
    contactEmail: faker.internet.email(),
    companyWebsite: faker.internet.url(),
    loanAmount: formatCurrency(faker.datatype.float({ min: 10000, max: 100000 })),
    loanInterest: faker.datatype.float({ min: 0.01, max: 0.1 }).toLocaleString('en-US', { style: 'percent' }),
    accountStatus: faker.helpers.arrayElement(['Active', 'Inactive']),
  }));
};

store.dispatch({ type: 'ADD_COMPANY', payload: createCompanyData(1000) });
store.dispatch({ type: 'SELECTED_ROW', payload: store.getState().companyData[0] });
console.log('company data', store.getState().companyData);
export default store;

/**
 * The application state interface.
 */
export interface AppState {
  companyData: CompanyType[];
  tableColumnConfig: MRT_ColumnDef<CompanyType>[];
  selectedRow: CompanyType;
}

/**
 * The type definition for a company.
 */
export interface CompanyType {
  companyName: string;
  address: string;
  registrationDate: string;
  numberOfEmployees: number;
  raisedCapital: string;
  turnover: string;
  netProfit: string;
  contactNumber: string;
  contactEmail: string;
  companyWebsite: string;
  loanAmount: string;
  loanInterest: string;
  accountStatus: string;
}

