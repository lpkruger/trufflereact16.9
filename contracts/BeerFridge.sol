pragma solidity ^0.4.25;

contract BeerFridge {
  uint8 beer_count;
  address owner;
  uint8 fridge_value;
  string message;

  constructor() public {
    beer_count = 20;
    owner = msg.sender;
    fridge_value = 30;
    message ="hello beer fridge";
  }

  function sell_beer(address _seller, uint8 _beer_ammount) public {
    beer_count += _beer_ammount;
    //add functionality to pay seller
  }

  function display_beer_ammount() public view returns(uint8) {
    return beer_count;
  }

  function display_beerfridge_message() public view returns(string) {
    return message;
  }

}
