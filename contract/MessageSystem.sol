// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract messageSystem{

    enum Designation{HOD,facultiy,None}
    mapping(address => Designation) public members;


    modifier upCheck{require(members[address(this)] == Designation.facultiy);_;}
    modifier downCheck{require(members[address(this)] == Designation.HOD);_;}

    event upMessageLog(address indexed _from,Designation indexed _senderDesignation,Designation _to, string message);
    event downMessageLog(address indexed _from,Designation indexed _senderDesignation,Designation _to, string message);
    event horizontalMessageLog(address indexed _from,Designation indexed _senderDesignation, Designation _to, string message);


    function addMember(address _address, Designation _isWho)public {
        members[_address] = _isWho;
    }
    function upMessage(address _address,string memory _message)public upCheck{
        emit upMessageLog(_address,Designation.facultiy, Designation.HOD, _message);
    }
    function downMessage(address _address,string memory _message)public downCheck{
        emit downMessageLog(_address,Designation.HOD, Designation.facultiy, _message);
    }
    function horizontalMessage(address _address,string memory _message)public {
        emit horizontalMessageLog(_address, members[_address], members[_address], _message);
    }

    function deleteMember(address _address)public{
        members[_address] =Designation.None;
    }
    //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 - hod
    //0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 - faculity
    //0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db - faculity

}