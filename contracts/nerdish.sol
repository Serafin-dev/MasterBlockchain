// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nerdish is ERC721URIStorage, PaymentSplitter, Ownable { 
        using SafeMath for uint256;
        using Counters for Counters.Counter;
        Counters.Counter private _tokenIdCounter;

        event Paused(address account);
        event Unpaused(address account);
        bool private _paused;

        //payees_ = ["0xaa130F1a2D3c4BF27aBE01640db73A075cb164f1","0x61BB5BAA4ED7Ff7Ac86BFb7cAcbB29c7e5EC8678"]
        //shares_ = [50, 50]
        uint public constant PRICE = 0.0001 ether;
        uint public constant MAX_SUPPLY = 10000;
        uint public constant MAX_MINT_AMOUNT = 100;
        //Buyers with their respective NERD id
        
        mapping (address => uint) private buyerToNerd; 
        //Lista de administradores
        address[] private admins;
        string private _baseUri;
        //Se almacenan ["cuenta : verdadero/falso"] si son admins registrados.
        mapping (address => bool ) private ownerByAddress;
        event pullSuccess(string msj);

        
        constructor (address[] memory _payees, uint256[] memory shares, string memory) 
        ERC721 ("Nerdish", "NERD") PaymentSplitter (_payees, shares)  payable {
                _paused = true; 
                admins = _payees;
                for(uint i = 0; i < admins.length; i++){ ownerByAddress[admins[i]] = true;}
        }
        
        // Pausable modifiers
        modifier whenPaused(){
                _requirePaused();
                _;
        }
        modifier whenUnpaused(){
                _requireNotPaused();
                _;
        }

        // acceso solo para accionistas de Master
        modifier onlyAdmins(){
                require(ownerByAddress[msg.sender] == true, "Parece que no eres admin");
                _;
        }

        // Pausable methods
        function paused() public view returns(bool) {
                return _paused;
        }
        function requireNotPaused() internal view {
                require(!paused(), "Pausable: Paused");
        }
        function requirePaused() internal view {
                require(paused(), "Pausable: Not Paused");
        }
        function _pause() external onlyOwner {
                _paused = true;
                emit Paused(msg.sender);
        }
        function _pause() external onlyOwner {
                _paused = false;
                emit Unpaused(msg.sender);
        }
        // Uri
        // "ipfs://QmY7QzWhQpJRNyYpYzyrPXyPfCYWeNqdQYBqspAq1xdtEp/0.png" => base uri => best practice => why?
        // https://ipfs.io/ipfs/{aca-va-el-hash}/{token-id} => bad practice to use that gateway "ipfs.io...etc"
        function setBaseUri(string memory baseUri_) external onlyOwner{
                _baseUri = baseUri_;
        }
        // get base uri from this and contracts that inherits from this one
        function _baseURI() internal view virtual override returns (string memory) {
                return _baseUri;
        }

        // Minting
        function mintNerd (uint256 _amount) public payable whenUnpaused{
                require(_amount != 0 && _amount <= MAX_MINT_AMOUNT, "Cantidad de NERDS incorrecta");
                require(msg.value >= PRICE.mul(_amount), "Cantidad de ether incorrecto");
                require(_tokenIdCounter.current() <= MAX_SUPPLY, "NO QUEDAN NERDS. SE AGOTARON, LO SENTIMOS");
             
                for (uint256 i = 0; i <= _amount - 1; i++){
                        uint id = _tokenIdCounter.current() + 1;
                        _safeMint(msg.sender, id);
                        buyerToNerd[msg.sender] = id;
                        _tokenIdCounter.increment();
                        _setTokenURI(tokenId, tokenURI(id));
                }
        }

        function tokenURI(uint256 tokenId) public view override returns (string memory) {
                return super.tokenURI(tokenId);
        }
        
        function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
                super._burn(tokenId);
        }
}       
