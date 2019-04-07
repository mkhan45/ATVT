import sys
import random

main_list = []
import re

biglist = []
classdic = {}
perioddic = {}



def makedics(filename):
    Scanner = open(filename, "r")
    for line1 in Scanner:
        line = line1.strip(" ")
        data = line.split()
        classes = len(data) // 2
        classlist = []
        for classnum in range(classes):
            classlist.append((data[classnum * 2 + 1], data[classnum * classes + 2]))
        biglist.append((data[0], classlist))
        if data[1] in classdic:
            classdic[data[1]].append((data[0], data[2]))
        if data[1] not in classdic:
            classdic[data[1]] = [(data[0], data[2])]
        if data[3] in classdic:
            classdic[data[3]].append((data[0], data[4]))
        if data[3] not in classdic:
            classdic[data[3]] = [(data[0], data[4])]


def replace_pos(board_str, pos, char):
    return board_str[:pos] + char + board_str[pos + 1:]


def teacher_schedule(main_list):
    temp = []
    for teacher, schedule in main_list:
        periods = [0, 1, 2, 3, 4, 5, 6]
        current = "0000000"
        cl = ["Break"]
        for items in range(0, len(schedule)):
            classes = schedule[items][0]
            number = schedule[items][1]
            cl.append(classes)
            for bluh in range(int(number)):
                pick = random.randint(0, len(periods) - 1)
                current = replace_pos(current, periods[pick], str(items + 1))
                periods.remove(periods[pick])
        temp.append((teacher, current, cl))
    return temp


def pretty_print_teacher(main_list):
    print("Teacher:     1       2       3       4       5       6       7")
    for teacher, schedule, classes in main_list:
        print(teacher + ":     " + classes[int(schedule[0])] + " " * (7 - len(classes[int(schedule[0])])) + classes[
            int(schedule[1])] + " " * (7 - len(classes[int(schedule[1])])) + classes[int(schedule[2])] + " " * (
                      7 - len(classes[int(schedule[2])])) + classes[int(schedule[3])] + " " * (
                      7 - len(classes[int(schedule[3])])) + classes[int(schedule[4])] + " " * (
                      7 - len(classes[int(schedule[4])])) + classes[int(schedule[5])] + " " * (
                      7 - len(classes[int(schedule[5])])) + classes[int(schedule[6])] + " " * (
                      7 - len(classes[int(schedule[6])])))


def copy_list(list):
    temp = []
    for items in list:
        temp.append(items)
    return temp


def make_children_list(filename):
    Scanner = open(filename, "r")
    studentlist = []
    for line1 in Scanner:
        line = line1.strip(" ")
        data = line.split()
        student = data[0]
        classlist = []
        classlist2 = []
        for item in range(1, len(data) - 3):
            classlist.append(data[item])
        for item in range(len(data) - 3, len(data)):
            classlist2.append(data[item])
        studentlist.append((student, classlist, classlist2))
    return studentlist


def period_dic(list):
    for item in list:
        for char in range(len(item[1])):
            if item[1][char] == "1" and item[2][1] in perioddic:
                perioddic[item[2][1]].append((item[0], char + 1))
            if item[1][char] == "1" and item[2][1] not in perioddic:
                perioddic[item[2][1]] = [(item[0], char + 1)]
            if item[1][char] == "2" and item[2][2] in perioddic:
                perioddic[item[2][2]].append((item[0], char + 1))
            if item[1][char] == "2" and item[2][2] not in perioddic:
                perioddic[item[2][2]] = [(item[0], char + 1)]


def csp(list, dic, period, answer):
    if period == 8:
        return answer
    for i in list:
        for teacher, p in dic[i]:
            if p == period:
                nitish = copy_list(answer)
                nitish.append((teacher, period, i))
                tuan = copy_list(list)
                tuan.remove(i)
                worked = csp(tuan, dic, period + 1, nitish)
                if worked == "poop":
                    continue
                else:
                    return worked
    return "poop"


makedics("teacher_info")
temp = teacher_schedule(biglist)
# pretty_print_teacher(temp)
# print(temp)
period_dic(temp)
thing = make_children_list("student_info")
dic = {}
for items in thing:
    mikail = csp(items[1], perioddic, 1, [])
    steven = 0
    while mikail == "poop" and steven < len(items[2]):
        items[1][random.randint(0, len(items[1]) - 1)] = items[2][steven]
        mikail = csp(items[1], perioddic, 1, [])
        if mikail == "poop":
            steven += 1
    dic[items[0]] = mikail


# print(dic)
# for item in dic.keys():
#     print(item + "   ", dic[item])
def writefile(filename):
    Scanner = open(filename, "w")
    for item in dic.keys():
        classes = dic[item]
        Scanner.write(item)
        Scanner.write(":")
        if classes == "poop":
            Scanner.write("TBD")
            Scanner.write("\n")
            continue
        # print("classes",classes)
        for clas in range(len(classes)-1):
            # print("clas",clas)
            Scanner.write(classes[clas][0])
            Scanner.write("/")
            Scanner.write(classes[clas][2])
            Scanner.write(",")
        Scanner.write(classes[len(classes)-1][0])
        Scanner.write("/")
        Scanner.write(classes[len(classes)-1][2])
        Scanner.write("\n")


writefile("sample.txt")
