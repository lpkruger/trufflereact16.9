pragma solidity ^0.4.25;

contract BeerFridge {
  uint8 beer_count;
  address owner;
  string message;

  constructor() public {
    beer_count = 20;
    owner = msg.sender;
    message ="hello beer fridge";
  }

  function get_balance() public view returns(uint256) {
    return address(this).balance;
  }

  function sell_beer(address _seller, uint8 _beer_ammount) public {
    beer_count += _beer_ammount;
    //add functionality to pay seller
  }

  // TODO: remove this method before any public release - it's for debugging
  function set_beer_count_debug(uint8 _beer_count) public {
    beer_count = _beer_count;
  }

  function display_beer_ammount() public view returns(uint8) {
    return beer_count;
  }

  function display_beerfridge_message() public view returns(string) {
    return message;
  }

}
