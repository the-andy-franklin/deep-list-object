import './App.css';
import { DeepListObject } from './components/DeepListObject';

function App() {
	return (
		<DeepListObject
			obj={{
				name: 'bob',
				age: '69',
				address: {
					street: '1234 main ave',
					city: 'San Francisco',
					state: 'California',
					addressLine2: {
						apt: '23',
					},
				},
				thisIsAnSQLQuery: 'Select * from table',
				'time@createdAt': '12:00:00',
				'12:00:00': 'time created',
			}}
		/>
	);
}

export default App;
