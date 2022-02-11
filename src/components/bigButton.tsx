import * as React from 'react';
type Props = {
  name: string;
  onClick: () => void;
};

/**
 * @param name The displayed button
 * @param onClick The function to be called when the button is clicked
 * @returns JSX element for the big button
 */
export const BigButton: React.FC<Props> = props => {
  return <div className='w-full bg-gradient-to-br from-yellow-400 to-orange-500 p-5
            rounded-3xl shadow-md transform hover:scale-100 scale-98 duration-200 hover:shadow-lg'
            onClick={props.onClick}>
      <div className='text-white text-center text-lg select-none'>  
        {props.name}
      </div>
    </div>
};