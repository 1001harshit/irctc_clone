
import { db } from '../config/firebase'; // Import your Firebase instance


const AddDataComponent = () => {
  // Function to add data to Firestore
  const addDataToFirestore = async () => {
    try {
      // Reference to a specific collection ('yourCollection') in Firestore
      const collectionRef = db.collection('trains');

      // Data to be added to the collection
      const dataToAdd = {
        field1: 'Value1',
        field2: 'Value2',
        // Add more fields as needed
      };

      // Adding the data to Firestore
      await collectionRef.add(dataToAdd);

      console.log('Data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding data: ', error);
    }
  };

  // Call the function to add data when needed (e.g., on button click)
  const handleAddData = () => {
    addDataToFirestore();
  };

  return (
    <div>
      <button onClick={handleAddData}>Add Data to Firestore</button>
    </div>
  );
};

export default AddDataComponent;

