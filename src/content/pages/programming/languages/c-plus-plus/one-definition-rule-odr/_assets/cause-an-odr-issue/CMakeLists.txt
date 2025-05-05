cmake_minimum_required(VERSION 3.10)

project(output LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(output main.cpp Child1.cpp Child2.cpp) 