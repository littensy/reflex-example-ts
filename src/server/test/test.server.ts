import { ReplicatedStorage } from "@rbxts/services";
import { Reporters, TestBootstrap } from "@rbxts/testez";

TestBootstrap.run([script.Parent!, ReplicatedStorage.WaitForChild("TS").WaitForChild("test")], Reporters.TextReporter);
