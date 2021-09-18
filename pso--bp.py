import numpy as np
import random
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
def parameter_initializer(data):
    """ 初始化权值 """
    w1=data[:12].reshape(4,3)
    b1 =data[12:15].reshape(1,3)
    w2 =data[15:18].reshape(3,1)
    b2 =data[18].reshape(1,1)
    return w1, b1, w2, b2

def loss(output, y):
        """ 损失函数 """
        cost = np.sum(1 / 2 * np.square(output - y))
        return cost

# 激活函数
def sigmoid(x):
    return 1 / (1 + np.exp(-x))
def d_sigmoid(x):
    return sigmoid(x) * (1 - sigmoid(x))
# 归一化数据
def normalize(data):
    data_min, data_max = data.min(), data.max()
    data = (data - data_min) / (data_max - data_min)
    return data
# 反归一化数据
def d_normalize(norm_data, data):
    data_min, data_max = data.min(), data.max()
    return norm_data * (data_max - data_min) + data_min
def forward_propagate(x, w1, b1, w2, b2):
    """ 构建三层神经网络 -- 前向传播 """
    """ x.shape = (m,n1)
        y.shape = (m, n3)
        w1.shape = (n, n2)
        b1.shape = (1, n2)
        w2.shape = (n2, n3)
        b2.shape = (1, n3)
    """
    z_1 = np.dot(x, w1) + b1
    a_1 = sigmoid(z_1)
    z_2 = np.dot(a_1, w2) + b2
    output = sigmoid(z_2)
    return a_1, output

def back_propagate(w1,b1, w2, b2, a_1, output, y, learning_rate):
    """ 反向传播 """
    dz_2 = (output - y)*output*(1-output)   # (m, n3)
    dw2 =  np.dot(a_1.T, dz_2)  # (n2, n3)
    db2 =  np.sum(dz_2, axis=0, keepdims=True)
    w2 = w2 - learning_rate * dw2
    b2 = b2 - learning_rate * db2

    dz_1 = np.dot(dz_2, w2.T) * ((1 - a_1) * a_1)  # sigmoid(z_1)的导数  # (m, n2)
    dw1 =  np.dot(x.T, dz_1)  # (n1, n2)
    db1 = np.sum(dz_1, axis=0, keepdims=True)  # (1, n2)

    w1 = w1 - learning_rate * dw1
    b1 = b1 - learning_rate * db1

    return w1, b1, w2, b2

def bpnn(n_y,x, y, epochs, learning_rate,data):
    w1,b1,w2,b2 = parameter_initializer(data)
    for epoch in range(epochs):
        a_1, output = forward_propagate(x, w1, b1, w2, b2)
        cost = loss(output, n_y)
        print("{} epoch, cost is {}".format(epoch, cost))
        w1, b1, w2, b2 = back_propagate(w1, b1, w2, b2, a_1, output, y, learning_rate)
    return w1,b1,w2,b2

#pso
class PSO():
#初始化
  def __init__(self, pN, dim, max_iter):
        self.w = 0.8
        self.c1 = 2
        self.c2 = 2
        self.r1 = 0.6
        self.r2 = 0.3
        self.pN = pN  # 粒子数量
        self.dim = dim  # 搜索维度
        self.max_iter = max_iter  # 迭代次数
        self.X = np.zeros((self.pN, self.dim))  # 所有粒子的位置和速度
        self.V = np.zeros((self.pN, self.dim))
        self.pbest = np.zeros((self.pN, self.dim))  # 个体经历的最佳位置和全局最佳位置
        self.gbest = np.zeros((1, self.dim))
        self.p_fit = np.zeros(self.pN)  # 每个个体的历史最佳适应值
        self.fit = 1e10  # 全局最佳适应值
#适用度函数
  def function(self, data,x,epochs):
    w1, b1, w2, b2 = parameter_initializer(data)
    for epoch in range(epochs):
        a_1, output = forward_propagate(x, w1, b1, w2, b2)
        cost = loss(output, n_y)
    return cost

#    初始化
  def init_Population(self,input):
        for i in range(self.pN):
            for j in range(self.dim):
                self.X[i][j] = random.uniform(0, 1)
                self.V[i][j] = random.uniform(0, 1)
            self.pbest[i] = self.X[i]
            tmp = self.function(self.X[i],input,20)
            self.p_fit[i] = tmp
            if (tmp < self.fit):
                self.fit = tmp
                self.gbest = self.X[i]

#更新粒子值
  def iterator(self,input):
        # fitness = []
        # data = []
        for t in range(self.max_iter):
            for i in range(self.pN):  # 更新gbest\pbest
                temp = self.function(self.X[i],input,20)
                if (temp < self.p_fit[i]):  # 更新个体最优
                    self.p_fit[i] = temp
                    self.pbest[i] = self.X[i]
                    if (self.p_fit[i] < self.fit):  # 更新全局最优
                        self.gbest = self.X[i]
                        self.fit = self.p_fit[i]
            for i in range(self.pN):
                self.V[i] = self.w * self.V[i] + self.c1 * self.r1 * (self.pbest[i] - self.X[i]) + \
                            self.c2 * self.r2 * (self.gbest - self.X[i])
                self.X[i] = self.X[i] + self.V[i]
            # fitness.append(self.fit)
            print(self.fit)  # 输出最优值
        # print(self.gbest)
        return self.gbest

# 可视化多项式曲线拟合结果
def draw_fit_curve(origin_xs, origin_ys, prediction_ys, step_arr, loss_arr):
    fig = plt.figure()
    ax1 = fig.add_subplot(121)
    ax1.plot(origin_xs, origin_ys, color='m', linestyle='', marker='.', label='原数据')
    ax1.plot(origin_xs, prediction_ys, color='#009688', label='拟合曲线')
    plt.title(s='BP神经网络拟合非线性曲线')
    ax2 = fig.add_subplot(122)
    ax2.plot(step_arr, loss_arr, color='red', label='误差曲线')
    plt.title(s='BP神经网络误差下降曲线')
    plt.legend()
    plt.show()

if __name__ == "__main__":

    x = np.array([[3442663,9157,11741,29504],
                  [3457061,10941,13745,36377],
                  [3471433,10799,15230,42378],
                  [3501811,11708,15607,44319],
                  [4201591,11708,15607,46144],
                  [4235352,13111,20419,49292],
                  [4256326,13970,22587,54440],
                  [4277690,14338,24000,56547],
                  [4298900,14430,25768,59023],
                  [4318675,15455,27727,63483],
                  [4344429,16775,29632,69327],
                  [4379700,18234,31469,77536],
                  [4421458,19912,33672,88272],
                  [3835038,21305,36362,90421]
                 ])
    y = np.array([4500,4975,4979,5400,6000,7374,7625,8194,8365,8118,8308,9695,11979,11752]).reshape(14,1)
    n_x=normalize(x)
    n_y=normalize(y)
    my_pso=PSO(50,19,30)
    my_pso.init_Population(n_x)
    data = my_pso.iterator(n_x)
    print('AAAA')
    print(data)
    w1, b1, w2, b2 = bpnn(n_y,x,n_y,100, 0.1,data)
    print('w1')
    print(w1)
    print('w2')
    print(w2)
    print('b1')
    print(b1)
    print('b2')
    print(b2)
    # 测试效果
    test = np.array([3835038,21305,36362,90421])
    x_test = np.array([3835038,22805,38862,100421])
    n_test = normalize(test)
    n_x_test = normalize(x_test)
    a_0,n_ouput0 = forward_propagate(n_test,w1,b1,w2,b2)
    a_1,n_output = forward_propagate(n_x_test, w1, b1, w2, b2)

    output0=d_normalize(n_ouput0,y)
    output=d_normalize(n_output,y)

    print('output0')
    print(output0)

    print('output')
    print(output)

    cost = loss(output0,11752)
    print(cost)


