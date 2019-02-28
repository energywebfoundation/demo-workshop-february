pragma solidity ^0.5.0;


contract Foo {
    
    uint public x;

    event NewX(uint newX);

    constructor(uint _x)
        public
    {
        x = _x;
        emit NewX(_x);
    }

    function setX(uint _x)
        external
        returns (bool)
    {
        x = _x;
        emit NewX(_x);
        return true;
    }
}