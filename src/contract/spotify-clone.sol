// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SpotifyClone {
    
    struct User {
        address userAddress;
        string username;
        bool isSubscribed;
        uint256 subscriptionEnd;
    }

    struct Creator {
        address creatorAddress;
        string creatorName;
        uint256[] uploadedSongs;
    }

    struct Song {
        uint256 songId;
        string songName;
        string songUrl;
        string songImage;
        address creator;
    }

    mapping(address => User) public users;
    mapping(address => Creator) public creators;
    mapping(uint256 => Song) public songs;

    address public owner;
    uint256 public subscriptionPrice;
    uint256 public subscriptionDuration;
    uint256 public songCounter;

    event UserRegistered(address userAddress, string username);
    event CreatorRegistered(address creatorAddress, string creatorName);
    event Subscribed(address userAddress, uint256 subscriptionEnd);
    event SongUploaded(uint256 songId, string songName, address creator);
    event PaymentReceived(address from, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyRegistered() {
        require(bytes(users[msg.sender].username).length != 0, "User is not registered");
        _;
    }

    modifier onlyCreator() {
        require(bytes(creators[msg.sender].creatorName).length != 0, "Only registered creators can call this function");
        _;
    }

    constructor(uint256 _subscriptionPrice, uint256 _subscriptionDuration) {
        owner = msg.sender;
        subscriptionPrice = _subscriptionPrice;
        subscriptionDuration = _subscriptionDuration;
        songCounter = 0;
    }

    function registerUser(string memory _username) public {
        require(bytes(users[msg.sender].username).length == 0, "User is already registered");

        users[msg.sender] = User({
            userAddress: msg.sender,
            username: _username,
            isSubscribed: false,
            subscriptionEnd: 0
        });

        emit UserRegistered(msg.sender, _username);
    }

    function registerCreator(string memory _creatorName) public {
        require(bytes(creators[msg.sender].creatorName).length == 0, "Creator is already registered");

        creators[msg.sender] = Creator({
            creatorAddress: msg.sender,
            creatorName: _creatorName,
            uploadedSongs: new uint256[](1) 
        });

        emit CreatorRegistered(msg.sender, _creatorName);
    }

    function subscribe() public payable onlyRegistered {
        require(msg.value >= subscriptionPrice, "Insufficient funds for subscription");
        require(!users[msg.sender].isSubscribed, "User is already subscribed");

        users[msg.sender].isSubscribed = true;
        users[msg.sender].subscriptionEnd = block.timestamp + subscriptionDuration;

        emit Subscribed(msg.sender, users[msg.sender].subscriptionEnd);
        emit PaymentReceived(msg.sender, msg.value);
    }

    function uploadSong(string memory _songName, string memory _songUrl, string memory _songImage) public onlyCreator {
        songs[songCounter] = Song({
            songId: songCounter,
            songName: _songName,
            songUrl: _songUrl,
            songImage: _songImage,
            creator: msg.sender
        });
        creators[msg.sender].uploadedSongs.push(songCounter);

        emit SongUploaded(songCounter, _songName, msg.sender);
        songCounter++;
    }

    function checkSubscription() public view onlyRegistered returns (bool) {
        if (users[msg.sender].subscriptionEnd > block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function setSubscriptionPrice(uint256 _subscriptionPrice) public onlyOwner {
        subscriptionPrice = _subscriptionPrice;
    }

    function setSubscriptionDuration(uint256 _subscriptionDuration) public onlyOwner {
        subscriptionDuration = _subscriptionDuration;
    }

    function getAllSongs() public view returns (Song[] memory) {
        Song[] memory allSongs = new Song[](songCounter);
        for (uint256 i = 0; i < songCounter; i++) {
            allSongs[i] = songs[i];
        }
        return allSongs;
    }
    

    function getUserInfo(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    function getCreatorInfo(address _creatorAddress) public view returns (Creator memory) {
        return creators[_creatorAddress];
    }

    function getSongInfo(uint256 _songId) public view returns (Song memory) {
        return songs[_songId];
    }
}
