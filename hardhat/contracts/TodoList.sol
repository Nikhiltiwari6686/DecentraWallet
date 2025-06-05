// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TodoList {
    struct Task {
        uint256 id;
        string text;
        string tag;
        bool completed;
    }

    Task[] private tasks;
    mapping(uint256 => address) public taskToOwner;
    uint256 private nextId = 1;

    function addTask(string memory _text, string memory _tag) external {
        tasks.push(Task(nextId, _text, _tag, false));
        taskToOwner[nextId] = msg.sender;
        nextId++;
    }

    function deleteTask(uint256 _id) external {
        require(taskToOwner[_id] == msg.sender, "Not owner");
        // Find task index to delete
        uint256 index = findTaskIndex(_id);
        require(index < tasks.length, "Task not found");

        // Swap and pop to delete
        tasks[index] = tasks[tasks.length - 1];
        tasks.pop();
    }

    function toggleTask(uint256 _id) external {
        require(taskToOwner[_id] == msg.sender, "Not owner");
        uint256 index = findTaskIndex(_id);
        require(index < tasks.length, "Task not found");
        tasks[index].completed = !tasks[index].completed;
    }

    function getTasks() external view returns (Task[] memory) {
        // Return only tasks owned by msg.sender
        uint256 count = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (taskToOwner[tasks[i].id] == msg.sender) {
                count++;
            }
        }
        Task[] memory userTasks = new Task[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < tasks.length; i++) {
            if (taskToOwner[tasks[i].id] == msg.sender) {
                userTasks[j] = tasks[i];
                j++;
            }
        }
        return userTasks;
    }

    // Helper to find task index by ID
    function findTaskIndex(uint256 _id) internal view returns (uint256) {
        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].id == _id) return i;
        }
        revert("Task not found");
    }
}
