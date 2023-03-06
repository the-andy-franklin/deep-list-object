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
						apt: '420',
					},
				},
				'this-is-a-string-key': 12,
				this_IsAnSQLQuery: 'Select * from acronyms;',
				'time@createdAt': '12:00:00',
				friends: ['alice', 'billy', 'charlie', ['david', 'emily', 'frank']],
				JSX_Element: <div>hello, world</div>,
				'p TAG': <p style={{ color: 'green', margin: 0 }}>green</p>,
			}}
		/>
	);
}

export default App;
