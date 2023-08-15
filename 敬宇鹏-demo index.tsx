import React, { useState } from 'react';  
  
const ShuttleBox: React.FC = () => {  
  const [inputValue, setInputValue] = useState('');  
  const [selectedItem, setSelectedItem] = useState('');  
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setInputValue(event.target.value);  
  };  
  
  const handleItemClick = (item: string) => {  
    setSelectedItem(item);  
    setInputValue('');  
  };  
  
  return (  
    <div>  
      <div className="shuttle-input">  
        <input  
          type="text"  
          value={inputValue}  
          onChange={handleInputChange}  
          placeholder="输入内容发送到右边"  
        />  
      </div>  
      <div className="shuttle-list">  
        {selectedItem ? (  
          <div className="selected-item">{selectedItem}</div>  
        ) : (  
          <div className="shuttle-items">  
            {Array.from({ length: 5 }, (_, index) => (  
              <div  
                key={index}  
                className="shuttle-item"  
                onClick={() => handleItemClick(`Item ${index + 1}`)}  
              >  
                Item {index + 1}  
              </div>  
            ))}  
          </div>  
        )}  
      </div>  
    </div>  
  );  
};  
  
export default ShuttleBox;