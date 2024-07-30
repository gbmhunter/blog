import matplotlib.pyplot as plt

PAGE_VIEWS_BY_YEAR = {
  '2017': 83000,
  '2018': 116000,
  '2019': 99000, 
}

def main():
    fig, ax = plt.subplots(1)
    ax.bar([1,2,3], PAGE_VIEWS_BY_YEAR.values())
    plt.savefig('page-views-by-year.png')

if __name__ == '__main__':
    main()
    
    