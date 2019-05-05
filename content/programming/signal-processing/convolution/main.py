import numpy as np
from matplotlib import pyplot as plt
from matplotlib.animation import FuncAnimation
import matplotlib.patches as mpatches

x_min = -2
x_max = 3

def main():
    create_plots()
    # create_gif()

def create_plots():
    fig, ax = plt.subplots(2, figsize=(5, 4))

    tau = np.linspace(x_min, x_max, 1000)

    # Box-car function which doesn't move
    f_t = np.where((tau >= 0) & (tau < 1), 1, 0)
    g_t = np.where((tau >= 0) & (tau < 1), 1, 0)

    ax[0].plot(tau, f_t, label="$f(\\tau)$", color="C0")
    ax[1].plot(tau, g_t, label="$g(\\tau)$", color="C1")

    ax[0].legend()
    ax[1].legend()

    plt.savefig('box-car-functions-ft-gt.png')

    # Flip g_tau
    g_tau_flipped = np.where((tau > -1) & (tau <= 0), 1, 0)

    fig, ax = plt.subplots(2, figsize=(5, 4))
    ax[0].plot(tau, f_t, label="$f(\\tau)$", color="C0")
    ax[1].plot(tau, g_tau_flipped, label="$g(-\\tau)$", color="C1")

    ax[0].legend()
    ax[1].legend()

    plt.savefig('g-tau-flipped.png')

    # Add offset t
    t = -0.5
    g_tau_offset = np.where(((t - tau) > 0) & ((t - tau) <= 1), 1, 0) 
    fig, ax = plt.subplots(2, figsize=(5, 4))
    ax[0].plot(tau, f_t, label="$f(\\tau)$", color="C0")
    ax[1].plot(tau, g_tau_offset, label="$g(t -\\tau)$", color="C1")

    xticks = list(range(x_min, x_max + 1))
    ax[1].set_xticks(xticks + [t])
    ax[1].set_xticklabels(xticks + ['$t$'])
    ax[0].legend()
    ax[1].legend()
    plt.savefig('g-tau-offset.png')

    # When t < 0
    t = -0.5
    g_t_m_tau = np.where(((t - tau) > 0) & ((t - tau) <= 1), 1, 0)
    f_tau_g_t_tau = f_t * g_t_m_tau
    f_conv_g = f_t*0
    fig, ax = plt.subplots(4, figsize=(5, 10))
    ax[0].plot(tau, f_t, label="$f(\\tau)$", color="C0")
    ax[1].plot(tau, g_tau_offset, label="$g(t -\\tau)$", color="C1")
    ax[2].plot(tau, f_tau_g_t_tau, label="$f(\\tau)g(t -\\tau)$", color="C2")
    ax[3].plot(tau, f_conv_g, label="$(f \\ast g)(t)$", color="C3")
    config_plot(ax, t)
    plt.tight_layout()
    plt.savefig('when-t-less-than-0.png')

    # When 0 <= t < 1
    t = 0.5
    g_t_m_tau = np.where(((tau) > -1 + t) & ((tau) <= 0 + t), 1, 0)
    f_tau_g_t_tau = f_t * g_t_m_tau

    f_conv_g = []
    for tau_val in tau:
        if tau_val < 0:
            f_conv_g.append(0)
        elif tau_val >= 0 and tau_val < t:
            f_conv_g.append(tau_val)
        else:
            f_conv_g.append(np.nan)
    fig, ax = plt.subplots(4, figsize=(5, 10))
    ax[0].plot(tau, f_t, label="$f(\\tau)$", color="C0")
    ax[1].plot(tau, g_t_m_tau, label="$g(t -\\tau)$", color="C1")
    ax[2].plot(tau, f_tau_g_t_tau, label="$f(\\tau)g(t -\\tau)$", color="C2")
    ax[3].plot(tau, np.array(f_conv_g), label="$(f \\ast g)(t)$", color="C3")
    config_plot(ax, t)
    plt.tight_layout()
    plt.savefig('when-0-lte-t-lt-1.png')

    # When 1 <= t < 2
    t = 1.5
    g_t_m_tau = np.where(((tau) > -1 + t) & ((tau) <= 0 + t), 1, 0)
    f_tau_g_t_tau = f_t * g_t_m_tau

    f_conv_g = []
    for tau_val in tau:
        if tau_val < 0:
            f_conv_g.append(0)
        elif tau_val >= 0 and tau_val < 1.0:
            f_conv_g.append(tau_val)
        elif tau_val >= 1 and tau_val < t:
            f_conv_g.append(2 - tau_val)
        else:
            f_conv_g.append(np.nan)
    fig, ax = plt.subplots(4, figsize=(5, 10))
    ax[0].plot(tau, f_t, label="$f(\\tau)$", color="C0")
    ax[1].plot(tau, g_t_m_tau, label="$g(t -\\tau)$", color="C1")
    ax[2].plot(tau, f_tau_g_t_tau, label="$f(\\tau)g(t -\\tau)$", color="C2")
    ax[3].plot(tau, np.array(f_conv_g), label="$(f \\ast g)(t)$", color="C3")
    config_plot(ax, t)
    plt.tight_layout()
    plt.savefig('when-1-lte-t-lt-2.png')

    # When t >= 2
    t = 2.5
    g_t_m_tau = np.where(((tau) > -1 + t) & ((tau) <= 0 + t), 1, 0)
    f_tau_g_t_tau = f_t * g_t_m_tau

    f_conv_g = []
    for tau_val in tau:
        if tau_val < 0:
            f_conv_g.append(0)
        elif tau_val >= 0 and tau_val < 1.0:
            f_conv_g.append(tau_val)
        elif tau_val >= 1 and tau_val < 2.0:
            f_conv_g.append(2 - tau_val)
        else:
            f_conv_g.append(0)
    fig, ax = plt.subplots(4, figsize=(5, 10))
    ax[0].plot(tau, f_t, label="$f(\\tau)$", color="C0")
    ax[1].plot(tau, g_t_m_tau, label="$g(t -\\tau)$", color="C1")
    ax[2].plot(tau, f_tau_g_t_tau, label="$f(\\tau)g(t -\\tau)$", color="C2")
    ax[3].plot(tau, np.array(f_conv_g), label="$(f \\ast g)(t)$", color="C3")
    config_plot(ax, t)
    plt.tight_layout()
    plt.savefig('when-2-lte-t-lt-inf.png')

def config_plot(axs, t):
    xticks = list(range(x_min, x_max + 1))
    for ax in axs:
        ax.legend()
        ax.set_xlim([x_min, x_max])
        ax.set_ylim([-0.5, 1.5])
        ax.set_xticks(xticks + [t])
        ax.set_xticklabels(xticks + ['$t$'])
        ax.axvline(t, color='#888888')
        ax.set_xlabel('$\\tau$')


def create_gif():
    """ Creates a .gif showing the convolution of two box-car signals
    """
    plt.style.use('seaborn-pastel')


    num_frames = 100

    # Create 2 plots stacked vertically which share an x-axis
    # Plot 0: f(tau), g(t-tau)
    # Plot 1: f(tau)*g(t-tau)
    # Plot 2: (f \ast g)(t)
    fig, ax = plt.subplots(3, sharex=True)

    ax[0].set_xlim((x_min, x_max))
    ax[0].set_ylim((-0.5, 1.5))
    ax[0].set_xlabel('$\\tau$')
    # ax[0].set_ylabel('$f(\\tau), g(\\tau)$')


    ax[1].set_xlim([x_min, x_max])
    ax[1].set_ylim([-0.5, 1.5])
    ax[1].set_xlabel('$\\tau$')
    # ax[1].set_ylabel('$(f \\ast g)(\\tau)$')

    ax[2].set_xlim([x_min, x_max])
    ax[2].set_ylim([-0.5, 1.5])
    ax[2].set_xlabel('$\\tau$')

    line_fx, = ax[0].plot([], [], lw=2, label='$f(\\tau)$')
    line_gx, = ax[0].plot([], [], lw=2, label='$g(t - \\tau)$')

    # Add vertical lines for time t to each plot
    line_t_ax0 = ax[0].axvline(0, color='black')
    line_t_ax1 = ax[1].axvline(0, color='black')
    line_t_ax2 = ax[2].axvline(0, color='black')

    # Draw a thick line at y=0
    # ax[0].plot([x_min, x_max], [0, 0], lw=3, color='black')

    time_text = fig.text(0.1, 0.90, '$t = 0$')

    # Create a rectangle to show the area of f(t)*g(t)
    rect = mpatches.Rectangle([0, 0], 1, 1, ec="none", fc='C2')
    ax[1].add_patch(rect)

    line_fmultg, = ax[1].plot([], [], lw=2, label='$f(\\tau)g(t - \\tau)$', color='C3')

    line_conv, = ax[2].plot([], [], lw=2, color='C2', label='$(f \\ast g)(t)$')
    conv = []
    conv_t = []


    ax[0].legend(loc='upper right')
    ax[1].legend(loc='upper right')
    ax[2].legend(loc='upper right')

    ax[0].set_title('Convolution of Two Box Car Functions')


    def init():
        line_fx.set_data([], [])
        line_gx.set_data([], [])
        line_conv.set_data([], [])
        return line_fx, line_gx, line_conv
    def animate(i):
        print(i)

        # 
        t = x_min + (i/num_frames)*(x_max - x_min)

        print(f't = {t}')

        x = np.linspace(x_min, x_max, 1000)

        # Box-car function which doesn't move
        f_x = np.where((x > 0) & (x < 1), 1, 0)

        # Draw unit step function (reversed)
        g_x = np.where((x > t - 1) & (x < t), 1, 0)

        f_mult_g = f_x*g_x

        conv_t.append(t)

        if t >= 0 and t < 1.0:
            conv.append(t)
            rect.set_bounds(0, 0, t, 1)
        elif t >= 1.0 and t < 2.0:
            conv.append(2 - t)
            rect.set_bounds(t - 1, 0, 1 - (t-1), 1)
        else:
            conv.append(0)
            rect.set_bounds(0, 0, 0, 0)

        line_t_ax0.set_data([t, t], [0, 1])
        line_t_ax1.set_data([t, t], [0, 1])
        line_t_ax2.set_data([t, t], [0, 1])
        line_fx.set_data(x, f_x)
        line_gx.set_data(x, g_x)
        line_fmultg.set_data(x, f_mult_g)
        line_conv.set_data(conv_t, np.array(conv))

        xticks = list(range(x_min, x_max + 1))
        ax[0].set_xticks(xticks + [t])
        ax[0].set_xticklabels(xticks + ['$t$'])

        time_text.set_text(f'$t = {t:0.1f}$')
        return line_t_ax0, line_t_ax1, line_fx, line_gx, line_conv, rect

    anim = FuncAnimation(fig, animate, init_func=init,
                                frames=num_frames, interval=100, blit=True)

    # Using imagemagick makes the GIF loop. pillow does not do this.
    anim.save('convolution-two-box-car-functions.gif', writer='imagemagick')

if __name__ == '__main__':
    main()