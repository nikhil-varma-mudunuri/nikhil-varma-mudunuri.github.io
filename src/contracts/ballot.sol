// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


contract Ballot {

    // events
    event Start();
    event End();
    event Results(string);


    // initial variables
    address public chairperson; 
    mapping(string => uint) timelines;
    mapping(address => Voter) voters;
    Proposal private MainProposal;
    string[] private tempOptions;


    // enum
    enum State{PUBLISHED_CONTRACT,STARTED_VOTING,ENDED_VOTING,DECLARED_RESULTS}
    State private state;

    
    // structs
    struct Voter {
        uint weight; 
        bool voted;  
        uint votedTimestamp; 
    }


    struct Option {
        bytes name; 
        uint voteCount;
    }

 
    struct Proposal {
        bytes name;
        Option[] options;
    }


    // modifiers
    modifier onlyChairperson () {
        require(msg.sender == chairperson,"Only chairperson can give right to vote.");
        _;
    }


    // constructor
    constructor(uint duration,string memory proposalName,string[] memory proposalOptions) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        state = State.PUBLISHED_CONTRACT;
        timelines["duration"] = duration*60;
        MainProposal.name = abi.encode(proposalName);
         for (uint i = 0; i < proposalOptions.length; i++) {
            MainProposal.options.push(Option({
                name: abi.encode(proposalOptions[i]),
                voteCount: 0
            }));
        }
    }

    // getters
    function getProposalName() external view returns(string memory) {
        return abi.decode(MainProposal.name,(string));
    }

    function getState() external view returns(State) {
        return state;
    }

    function getProposalOptions() external view returns(string[] memory)
    {
        uint256 resultCount = MainProposal.options.length;  
        string[] memory result = new string[](resultCount); 
        for (uint i = 0; i < resultCount; i++) {
            result[i] = abi.decode(MainProposal.options[i].name,(string));
        }
        return result;
    } 


    function isVoted (address addr) external view returns(bool,string memory) {
        if(voters[addr].weight == 0) {  // no right to vote
            return (true,"No Right To Vote");
        }
        if (voters[addr].voted ){ // has right to vote and already voted
        return (true,"already voted");
        } 
        return (false,"go"); // has right to vote and not voted
    }

    function getTimeLines() external view returns(uint[3] memory) {
        return [timelines["duration"],timelines["startedAt"],timelines["endedAt"]];
    }


    // event handler functions
    function start() external onlyChairperson {
        require(state != State.ENDED_VOTING || 
        state != State.DECLARED_RESULTS,"voting completed");
        require(state != State.STARTED_VOTING,"voting already started");
        state = State.STARTED_VOTING;
        timelines["startedAt"] = block.timestamp;
        timelines["endedAt"] = timelines["startedAt"] + timelines["duration"];
        emit Start();
    }

    function end() external onlyChairperson {
        require(!(state == State.PUBLISHED_CONTRACT),"election not started at");
        require(state != State.ENDED_VOTING,"election already ended");
        state = State.ENDED_VOTING;
        emit End();
    }

    function giveRightToVote(address[] memory votersAddr) external onlyChairperson {
        for (uint i =0;i<votersAddr.length;i++)
        {
            require(!voters[votersAddr[i]].voted,"The voter already voted.");
            require(voters[votersAddr[i]].weight == 0,"Already have to right");
            voters[votersAddr[i]].weight = 1;
        }
    }

    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(state == State.ENDED_VOTING || state == State.STARTED_VOTING,"Election not started at"); // election started
        require(state != State.ENDED_VOTING,"Election completed"); // election not ended
        require(sender.weight != 0, "Has no right to vote"); // has right to vote 
        require(!sender.voted, "Already voted."); // not voted
        sender.voted = true;
        sender.votedTimestamp = block.timestamp;
        MainProposal.options[proposal].voteCount += sender.weight;
    }

    struct Answer {
        string name;
        uint count;
    }
   
    function results() external onlyChairperson view returns(Answer[] memory)
    {
        Answer[] memory result = new Answer[](MainProposal.options.length); 
        
        for(uint i =0;i<MainProposal.options.length;i++)
        {
            result[i] = Answer({
                name: abi.decode(MainProposal.options[i].name,(string)),
                count:MainProposal.options[i].voteCount
            });
        }
        return result;
    }

    function winnerName(string memory winner) external onlyChairperson {
        emit Results(winner);
    }

}